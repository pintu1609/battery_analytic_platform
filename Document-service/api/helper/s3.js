const AWS = require('aws-sdk');
// const { v4: uuidv4 } = require('uuid');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFile = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
  };
  return s3.upload(params).promise();
};

const deleteFile = (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return s3.deleteObject(params).promise();
};

const getFileLink = (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60 * 5, // 5 minutes signed URL
  };
  return s3.getSignedUrl('getObject', params);
};

module.exports = { uploadFile, deleteFile, getFileLink };
