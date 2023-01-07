const handler = require('./index');

const body = {
  // "templateId": "reset-password",
  // "templateId": "verify-email",
  // "templateId": "password-changed",
  // "templateId": "account-verified",
  // "templateId": "register",
  templateId: 'register',
  data: {
    name: 'John Doe',
    email: 'name@example.com'
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
