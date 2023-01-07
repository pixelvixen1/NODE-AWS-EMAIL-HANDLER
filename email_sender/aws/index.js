const model = require('../model/model');
const BuildEmailController = require('../controllers/BuildEmailController');
const SendEmailController = require('../controllers/SendEmailController');
const UpdateModelController = require('../controllers/UpdateModelController');
const SqsService = require('./services/SqsService');

exports.handler = async function (event) {
  try {
    for (const record of event.Records) {
      const { messageId, receiptHandle, body } = record;
      const parsedBody = JSON.parse(body);
      const { name, email } = parsedBody.data;
      const { templateId, language, link } = parsedBody;

      // ----- UPDATE MODEL DATA -----//
      const UpdateModelResult = await UpdateModelController.setData(name, email, templateId, language, link);

      // ----- BUILD EMAIL -----//
      let buildEmailResponse;
      if (UpdateModelResult !== 400) {
        buildEmailResponse = await BuildEmailController.renderEmailTemplateByID(templateId);
      }

      // ----- SEND EMAIL -----//
      if (buildEmailResponse === 200) {
        const sendEmailResponse = await SendEmailController.sendEmail(model.user.email, model.user.subject, model.user.htmlEmail, model.user.txtEmail);
        console.log('----EMAIL SENT RESPONSE :', sendEmailResponse);
      }

      if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'staging') {
        const deleteResponse = await SqsService.deleteSQSMessages(messageId, receiptHandle);
        console.log('----MESSAGES DELETED FROM SQS QUEUE :', deleteResponse);
      }

      if (process.env.NODE_ENV === 'local') {
        const fs = require('fs');
        fs.writeFileSync(`../dist/templates_sent/${templateId}.html`, model.user.htmlEmail);
        fs.writeFileSync(`../dist/templates_sent/${templateId}.txt`, model.user.txtEmail);
      }
    }
    return 200;
  } catch (err) {
    console.error('error: ', err);
    return 400;
  }
};
