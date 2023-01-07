const { mockClient } = require('aws-sdk-client-mock');
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../../../../aws_config');
const S3Service = require('../../../../aws/services/S3Service');

// to use later for integration tests
// const sourcePath = 'templates_hbs/';
// const fs = require('fs');
// describe('AWS S3 REAL tests', () => {

//   test('S3 GetObjectCommand to retrive HTML template', async () => {

//     const templateId = 'register';
//     const template = await S3Service.get(`${sourcePath}${templateId}.txt`);

//     expect(template).toBeTruthy();

//     console.log('-----------------------template', template)

//   });

//   test('S3 write image file to S3', async () => {

//     const image = fs.readFileSync('../dist/images/contact3.gif');
//     const fileName = `images7/contact3.gif`;

//     const res = await S3Service.write(image, fileName, config.s3.bucket, 'public-read');

//     expect(res).toBeTruthy();

//     console.log('-----------------------res', res)

//   })

// });

describe('AWS S3 Mock tests', () => {
  const s3ClientMock = mockClient(S3Client);

  beforeEach(() => {
    s3ClientMock.reset();
  });

  describe('Get file from S3 with GetObjectCommand', () => {
    describe('S3Service get file from S3', () => {
      beforeEach(() => {
        s3ClientMock.on(GetObjectCommand).resolves({});
      });

      const item = 'images/contact.gif';

      it('should get file from s3', async () => {
        await S3Service.get(item);
        expect(s3ClientMock.call(0).args[0].input).toEqual({
          Bucket: config.s3.bucket,
          Key: item,
        });
      });
    });
  });

  describe('Write file to S3 with PutObjectCommand', () => {
    describe('S3Service write file to S3', () => {
      beforeEach(() => {
        s3ClientMock.on(PutObjectCommand).resolves({});
      });

      const fileName = 'test/data.txt';
      const data = 'This is test data to be uploaded to S3';

      it('should write the file to s3', async () => {
        await S3Service.write(data, fileName, config.s3.bucket, 'public-read');
        expect(s3ClientMock.call(0).args[0].input).toEqual({
          Bucket: config.s3.bucket,
          Key: fileName,
          Body: data,
          ACL: 'public-read'
        });
      });
    });
  });
});
