const { SQSClient, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const config = require('../../aws_config');

/**
* @param {string} messageId SQS message identifier
* @param {string} receiptHandle SQS message receiptHandle
* @returns {Promise}
*/

module.exports.deleteSQSMessages = async (messageId, receiptHandle) => {
  const client = new SQSClient({ region: config.region });

  const params = {
    QueueUrl: config.sqsQueueURL,
    ReceiptHandle: receiptHandle
  };

  try {
    const data = await client.send(new DeleteMessageCommand(params));
    console.log('Success : DeleteMessageCommand response', data);
    return messageId;
  } catch (err) {
    console.error('error : sqs DeleteMessageCommand :', err, err.stack);
    return err;
  }
};
