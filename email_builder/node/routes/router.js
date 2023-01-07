const express = require('express');

const router = express.Router();
const fs = require('fs');
const model = require('../../../email_sender/model/model');
const BuildEmailController = require('../../../email_sender/controllers/BuildEmailController');
const SendEmailController = require('../../../email_sender/controllers/SendEmailController');
const UpdateModelController = require('../../../email_sender/controllers/UpdateModelController');

// BUILD AND SEND GENERATED EMAIL
router.post('/aws/build-email', async (req, res) => {
  const {
    templateId, data, language, link
  } = req.body;
  const { name, email } = data;

  // ----- UPDATE MODEL DATA -----//
  await UpdateModelController.setData(name, email, templateId, language, link);

  // ----- BUILD EMAIL -----//
  const buildEmailResponse = await BuildEmailController.renderEmailTemplateByID(templateId);

  // ----- SEND EMAIL -----//
  if (buildEmailResponse === 200) {
    await SendEmailController.sendEmail(email, model.user.subject, model.user.htmlEmail, model.user.txtEmail);
  }

  fs.writeFileSync(`../dist/templates_sent/${templateId}.html`, model.user.htmlEmail);
  fs.writeFileSync(`../dist/templates_sent/${templateId}.txt`, model.user.txtEmail);
  res.status(200).send(`Success : data recieved from AWS for user ${data.name} with template id = ${templateId}`);
});

// PREVIEW GENERATED HTML EMAIL
router.get('/aws/user-email', (req, res) => {
  if (model.user.htmlEmail !== '') {
    res.status(200).send(model.user.htmlEmail);
  } else {
    res.status(200).send('PLEASE POST SOME DATA TO BUILD THE EMAIL FIRST');
  }
});

// PREVIEW GENERATED TEXT EMAIL
router.get('/aws/user-email-text', (req, res) => {
  if (model.user.txtEmail !== '') {
    res.status(200).send(model.user.txtEmail);
  } else {
    res.status(200).send('PLEASE POST SOME DATA TO BUILD THE EMAIL FIRST');
  }
});

// GET CMS FILE
router.get('/aws/cms', (req, res) => {
  res.status(200).send(model.text);
});

module.exports = router;
