"use strict";

// const AWS = require('aws-sdk');

const { S3Client } = require("@aws-sdk/client-s3");
const {
  BUCKETEER_AWS_ACCESS_KEY_ID,
  BUCKETEER_AWS_REGION,
  BUCKETEER_BUCKET_NAME,
  BUCKETEER_AWS_SECRET_ACCESS_KEY
} = require('../config');

const s3Client = new S3Client({
  accessKeyId: BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: BUCKETEER_AWS_SECRET_ACCESS_KEY,
  region: BUCKETEER_AWS_REGION,
});


const multer = require("multer");
const multerS3 = require("multer-s3");

/** multer upload function */
const uploadImg = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: BUCKETEER_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.filename });
    },
    key: function (req, file, cb) {
      cb(null, `public/${Date.now().toString()}`);
    },
  }),
});

/** Construct a object URL from s3 bucket parameters
 * returns a url string
 *
 * @example https://r27-sharebnb.s3.amazonaws.com/1663108593387
 */

function getUrlFromBucket(key) {
  return `https://${BUCKETEER_BUCKET_NAME}.s3.amazonaws.com/${key}`;
}

module.exports = {
  uploadImg,
  getUrlFromBucket,
};