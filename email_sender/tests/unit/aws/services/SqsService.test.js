const { mockClient } = require('aws-sdk-client-mock');
const { SQSClient, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const config = require('../../../../aws_config');
const SqsService = require('../../../../aws/services/SqsService');

describe('AWS SQS Mock tests', () => {
  const sqsClientMock = mockClient(SQSClient);

  beforeEach(() => {
    sqsClientMock.reset();
  });

  describe('AWS SQS DeleteMessageCommand', () => {
    describe('SqsService DeleteMessageCommand tests', () => {
      beforeEach(() => {
        sqsClientMock.on(DeleteMessageCommand).resolves({});
      });

      const messageId = '12345';
      const receiptHandle = 'AQEBz5FpFZ9iA4lXXL+vwDTy6xuTX+qLLo6oCNL95wnAou9JBaxOyTg+GfOF8X284QhUstOSJ7Ka9+TgY2ZpvFFJh42enuqMbtVl1isPEfydpZVCeK+SWb8VQizPqZw9RnnIsVHMPh+HuLLG7NQbILT2WlX4egbog0latemCDt7b8Aq3l0j+fMQz8aT8X4WPJyOlN4rS34IC8tqLOotaeorbscRkz9s3zYM2EYjRXR/csyW/rNSuidEmo/iZFsrGecsUG8NR4ioZN4o4vBXU2nTYmdgsqZ0+6dCDz8I4W+x8eRU=';

      it('calls deleteSQSMessages and checks called arguments have the correct data ', async () => {
        await SqsService.deleteSQSMessages(messageId, receiptHandle);
        expect(sqsClientMock.call(0).args[0].input).toEqual({
          QueueUrl: config.sqsQueueURL,
          ReceiptHandle: receiptHandle
        });
      });

      it('calls deleteSQSMessages and checks data returned is for the messageId which called it ', async () => {
        const responseId = await SqsService.deleteSQSMessages(messageId, receiptHandle);
        expect(responseId).toEqual(messageId);
      });
    });
  });
});
