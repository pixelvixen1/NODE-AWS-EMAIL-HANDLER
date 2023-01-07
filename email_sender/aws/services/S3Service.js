const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../../aws_config');

const s3Client = new S3Client({
  region: config.region
});

const S3 = {

  /**
  * @param {string} fileName S3 name identifier
  * @param {string} bucket S3 bucket name
  * @returns {Promise}
  */
  async get(fileName, bucket = config.s3.bucket) {
    try {
      const params = {
        Bucket: bucket,
        Key: fileName
      };

      const convertStream = (stream, fileType) => new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => (fileType === 'string' ? resolve(Buffer.concat(chunks).toString('utf8')) : resolve(Buffer.concat(chunks))));
      });

      const response = await s3Client.send(new GetObjectCommand(params));

      if (process.env.NODE_ENV === 'test') {
        return response;
      }

      const fileType = fileName.slice(-4) === 'html' || fileName.slice(-3) === 'txt' ? 'string' : 'buffer';
      return await convertStream(response.Body, fileType);
    } catch (err) {
      console.log(`There was an error getting the file: ${fileName} from S3 bucket ${bucket} :`, err);
      throw err;
    }
  },

  /**
  * @param {string} data data to be written
  * @param {string} fileName S3 name identifier
  * @param {string} bucket S3 bucket name
  * @returns {Promise}
  */
  async write(data, fileName, bucket = config.s3.bucket, acl = 'private') {
    const params = {
      Bucket: bucket,
      Body: data,
      Key: fileName,
      ACL: acl
    };

    try {
      return await s3Client.send(new PutObjectCommand(params));
    } catch (err) {
      console.log('Error uploading to S3: ', err);
      throw err;
    }
  },
};

module.exports = S3;
