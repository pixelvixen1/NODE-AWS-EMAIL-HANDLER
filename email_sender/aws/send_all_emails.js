/* eslint-disable no-promise-executor-return */
const handler = require('./index');

const emailAddress = 'name@example.com';

const templates = [
  'reset-password',
  'verify-email',
  'password-changed',
  'account-verified',
  'register',
  'welcome'
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendTemplates = async () => {
  for (const template of templates) {
    const body = {
      templateId: template,
      data: {
        name: 'John Doe',
        email: emailAddress
      },
      language: 'en-GB',
      link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs'
    };

    handler.handler(
      {
        Records: [{
          messageId: '12345',
          receiptHandle: 'AQEBz5FpFZ9iA4lXXL+vwDTy6xuTX+qLLo6oCNL95wnAou9JBaxOyTg+GfOF8X284QhUstOSJ7Ka9+TgY2ZpvFFJh42enuqMbtVl1isPEfydpZVCeK+SWb8VQizPqZw9RnnIsVHMPh+HuLLG7NQbILT2WlX4egbog0latemCDt7b8Aq3l0j+fMQz8aT8X4WPJyOlN4rS34IC8tqLOotaeorbscRkz9s3zYM2EYjRXR/csyW/rNSuidEmo/iZFsrGecsUG8NR4ioZN4o4vBXU2nTYmdgsqZ0+6dCDz8I4W+x8eRU=',
          body: JSON.stringify(body)
        }]
      },
      {}, // content
      (error, result) => {
        if (error) console.error('error: ', JSON.stringify(error, null, 2));
        else console.log('result: ', JSON.stringify(result, null, 2));
      }
    );

    await wait(2000);
  }
};

sendTemplates();
