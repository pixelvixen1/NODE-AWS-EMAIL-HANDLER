/* eslint-disable no-unused-expressions */
require('custom-env').env(true);

const settings = {
  region: process.env.REGION,
  sqsQueueURL: process.env.SQS_QUEUE_URL,
  ses: {
    FROM_EMAIL_ADDRESS: process.env.FROM_EMAIL_ADDRESS,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD
  },
  s3: {
    bucket: process.env.S3_BUCKET,
    imagesURL: process.env.S3_IMAGES_URL
  },
  directus: {
    cmsFilesS3URL: process.env.DIRECTUS_CMS_FILES_S3_URL,
    s3Bucket: process.env.DIRECTUS_S3_BUCKET
  }
};


module.exports = settings;
