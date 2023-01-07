const he = require('he');
const BuildEmailController = require('../../../controllers/BuildEmailController');
const model = require('../../../model/model');
const UpdateModelController = require('../../../controllers/UpdateModelController');

const templates = [
  'reset-password',
  'verify-email',
  'password-changed',
  'account-verified',
  'register',
  'welcome',
];

test('BuildEmailController to build html and text templates for all email templates and to return 200 success and store email data in model', async () => {
  const buildAllEmails = async () => {
    for (const template of templates) {
      const buildEmailResponse = await BuildEmailController.renderEmailTemplateByID(template);
      expect(buildEmailResponse).toEqual(200);
      expect(model.user.htmlEmail).toBeTruthy();
      expect(model.user.txtEmail).toBeTruthy();
      expect(model.user.htmlEmail).not.toEqual('');
      expect(model.user.txtEmail).not.toEqual('');
    }
  };
  await buildAllEmails();
});

test('BuildEmailController to build html and text templates and then test generated data is correct', async () => {
  const user = {
    name: 'John Doe',
    email: 'name@example.com',
    templateId: 'verify-email',
    language: 'en-GB',
    link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
  };

  const data = await UpdateModelController.setData(
    user.name,
    user.email,
    user.templateId,
    user.language,
    user.link
  );

  expect(data.user).toEqual({
    name: 'John Doe',
    email: 'name@example.com',
    templateId: 'verify-email',
    language: 'en-GB',
    link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
    subject: 'Verify Email',
  });

  expect(data.language).toEqual('en-GB');
  expect(data.dir).toEqual('ltr');
  expect(data.textDirection).toEqual('left');

  const buildEmailResponse = await BuildEmailController.renderEmailTemplateByID('verify-email');
  expect(buildEmailResponse).toEqual(200);
  expect(model.user.htmlEmail).toBeTruthy();
  expect(model.user.txtEmail).toBeTruthy();
  expect(model.user.htmlEmail).not.toEqual('');
  expect(model.user.txtEmail).not.toEqual('');
  expect(model.user.txtEmail).toContain('Verify your email');
  expect(model.user.txtEmail).toContain(`Dear ${user.name}`);

  const email = he.decode(model.user.htmlEmail);
  for (const txt of Object.values(model.text)) {
    const valid = email.includes(txt);
    expect(valid).toBeTruthy();
  }
});

test('BuildEmailController to return 400 error if email template does not exist', async () => {
  const user = {
    name: 'John Doe',
    email: 'name@example.com',
    templateId: 'test-email',
    language: 'en-GB',
    link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
  };

  await UpdateModelController.setData(
    user.name,
    user.email,
    user.templateId,
    user.language,
    user.link
  );

  const buildEmailResponse = await BuildEmailController.renderEmailTemplateByID('test-email');
  expect(buildEmailResponse).toEqual(400);
  expect(model.user.htmlEmail).not.toBeTruthy();
  expect(model.user.txtEmail).not.toBeTruthy();
});
