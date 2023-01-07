const fs = require('fs');
const S3Service = require('../aws/services/S3Service');
const config = require('../aws_config').default;

const uploadImages = async () => {
  const imagesFolder = '../dist/images';

  try {
    const upload = async (image, fileName) => {
      await S3Service.write(image, fileName, config.s3.bucket, 'public-read');
      console.log('IMAGE UPLOAD COMPLETE FOR :', fileName);
    };

    fs.readdirSync(imagesFolder).forEach((file) => {
      const image = fs.readFileSync(`${imagesFolder}/${file}`);
      const fileName = `images/${file}`;
      upload(image, fileName);
    });
  } catch (error) {
    throw Error('---------ERROR UPLOADING IMAGES', error);
  }
};

uploadImages();
