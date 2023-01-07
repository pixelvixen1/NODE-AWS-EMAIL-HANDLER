const fs = require('fs');
const Handlebars = require('handlebars');
const model = require('../model/model');
const S3Service = require('../aws/services/S3Service');
const sourcePath = 'templates_hbs/';

module.exports.renderEmailTemplateByID = async (templateId) => {
  try {
    let htmlTemplate = '';
    let txtTemplate = '';

    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
      // ----- QUICK LOCAL TESTING - send prebuilt email with content -------//
      // const htmltemplateLocal = fs.readFileSync(`../dist/templates/${templateId}.html`).toString('utf8');
      // console.log('htmltemplateLocal', htmltemplateLocal);
      // model.user.htmlEmail = htmltemplateLocal;
      // return 200;

      // ------- QUICK LOCAL TESTING - send local compiled handlebars template -------//
      htmlTemplate = fs.readFileSync(`../dist/templates_hbs/${templateId}.html`).toString('utf8');
      txtTemplate = fs.readFileSync(`../dist/templates_hbs/${templateId}.txt`).toString('utf8');
    } else {
      htmlTemplate = await S3Service.get(`${sourcePath}${templateId}.html`).catch((err) => {
        console.log('Error getting html template ', err);
        return null;
      });

      txtTemplate = await S3Service.get(`${sourcePath}${templateId}.txt`).catch((err) => {
        console.log('Error getting txt template ', err);
        return null;
      });
    }

    if (htmlTemplate) {
      const template = Handlebars.compile(htmlTemplate.toString('utf8'));
      const htmlEmail = template(model);
      model.user.htmlEmail = htmlEmail;
    }

    if (txtTemplate) {
      const txtTemplateHbs = Handlebars.compile(txtTemplate);
      const txtEmail = txtTemplateHbs(model);
      model.user.txtEmail = txtEmail;
    }

    return htmlTemplate || txtTemplate ? 200 : 400;
  } catch (error) {
    console.log('CONTROLLER EMAIL RENDER ERROR', error);
    return 400;
  }
};
