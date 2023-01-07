const fs = require('fs');
const model = require('../model/model');
const config = require('../aws_config');

module.exports.setData = async (name, email, templateId, language, link) => {
  // eslint-disable-next-line security/detect-object-injection
  Object.keys(model).forEach((key) => { model[key] = null; });

  model.user = {
    name, email, templateId, language, link
  };
  model.textDirection = language.slice(0, 2) === 'ar' ? 'right' : 'left';
  model.dir = language.slice(0, 2) === 'ar' ? 'rtl' : 'ltr';
  model.language = language;

  try {
    const fileName = templateId.replace(/[-]/g, '').toLowerCase();
    const efsPath = process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
      ? `../email_builder/cms/${language}`
      : `/mnt/cms/${language}`;
    const translationFile = fs.readFileSync(`${efsPath}/email_${fileName}.json`).toString('utf8');
    const images = fs.readFileSync(`${efsPath}/email_images.json`).toString('utf8');
    const imageBaseUrl = `${config.s3.imagesURL}/images/`;

    const emailImages = Object.values(JSON.parse(images)).map((img) => {
      const src = `${imageBaseUrl}${img.filename_download}`;
      img.hide = !img.show;
      img.src = src || img.src;
      if (parseInt(img.width) > 580 || img.width === '100%') {
        img.width = '580';
        img.height = 'auto';
      }
      return img;
    });

    model.text = JSON.parse(translationFile);
    model.logo = emailImages.find((img) => img.id === 'LOGO');
    model.logoDark = emailImages.find((img) => img.id === 'LOGO_DARK');
    const emailImage = emailImages.find((img) => img.id === `${fileName.toUpperCase()}_IMAGE`);
    const emailImageDark = emailImages.find((img) => img.id === `${fileName.toUpperCase()}_IMAGE_DARK`);

    if (emailImage) {
      model.emailImage = emailImage;
    } else {
      model.emailImage.show = false;
      model.emailImage.hide = true;
    }

    if (emailImageDark) {
      model.emailImageDark = emailImageDark;
    } else {
      model.emailImageDark.show = false;
      model.emailImageDark.hide = true;
    }

    // Set email subject - incase it was left empty - set as template name formatted
    model.user.subject = model.text.subject || templateId.replace(/[-]/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

    return model;
  } catch (error) {
    console.log('---------ERROR FETCHING TRANSLATIONS', error);
    return 400;
  }
};
