const UpdateModelController = require('../../../controllers/UpdateModelController');
const model = require('../../../model/model');

const templates = [
  'reset-password',
  'verify-email',
  'password-changed',
  'account-verified',
  'register',
  'welcome',
];

describe('Tests UpdateModelController with input data', () => {
  test('Test UpdateModelController with English user data for template id welcome', async () => {
    const user = {
      name: 'John Doe',
      email: 'name@example.com',
      templateId: 'welcome',
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
      templateId: 'welcome',
      language: 'en-GB',
      link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
      subject: 'Welcome',
    });

    expect(data.language).toEqual('en-GB');
    expect(data.dir).toEqual('ltr');
    expect(data.textDirection).toEqual('left');
  });

  test('Test UpdateModelController with Arabic user data for template id register', async () => {
    const user = {
      name: 'John Doe',
      email: 'name@example.com',
      templateId: 'register',
      language: 'ar-SA',
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
      templateId: 'register',
      language: 'ar-SA',
      link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
      subject: 'Register',
    });

    expect(data.language).toEqual('ar-SA');
    expect(data.dir).toEqual('rtl');
    expect(data.textDirection).toEqual('right');
  });

  test('Test UpdateModelController for all templates to return correct user data and subject', async () => {
    const updateModel = async () => {
      for (const template of templates) {
        const user = {
          name: 'John Doe',
          email: 'name@example.com',
          templateId: template,
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
          templateId: template,
          language: 'en-GB',
          link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
          subject: template
            .replace(/[-]/g, ' ')
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
        });
      }
    };

    await updateModel();
  });
});

describe('Tests UpdateModelController email images data', () => {
  test('Test UpdateModelController email images data visibilty and width', async () => {
    const user = {
      name: 'John Doe',
      email: 'name@example.com',
      templateId: 'welcome',
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

    const images = [data.logo, data.logoDark, data.emailImage, data.emailImageDark];

    images.forEach((img) => {
      expect(img.show).toEqual(!img.hide);
      expect(parseInt(img.width)).toBeLessThanOrEqual(580);
    });
  });
});

describe('UpdateModelController clear data', () => {
  test('UpdateModelController to clear and reset data model before new data injection and return a 400 error for sending an undefined template id ', async () => {
    const user = {
      name: 'John Doe',
      email: 'name@example.com',
      language: 'ar-SA',
      link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
    };

    const data = await UpdateModelController.setData(
      user.name,
      user.email,
      user.templateId, // send undefined for errors and to check old data has cleared
      user.language,
      user.link
    );

    expect(data).toEqual(400);
    expect(model.language).toEqual('ar-SA');
    expect(model.dir).toEqual('rtl');
    expect(model.textDirection).toEqual('right');
    expect(model.user.templateId).toEqual(undefined);
    expect(model.logo).toEqual(null);
    expect(model.logoDark).toEqual(null);
    expect(model.emailImage).toEqual(null);
    expect(model.emailImageDark).toEqual(null);
    expect(model.text).toEqual(null);

  });
});
