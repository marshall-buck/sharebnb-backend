"use strict";

const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const BUCKET_NAME = process.env.BUCKETEER_BUCKET_NAME;
const AWS_BUCKET_NAME = "sharebb-r";

// const {
//   BUCKET_NAME,
//   ACCESS_KEY_ID,
//   SECRET_ACCESS_KEY,
//   REGION,
// } = require('../config');
const multer = require("multer");
const multerS3 = require("multer-s3");

// const s3Client = new S3Client({
//   region: REGION,
//   accessKeyId: ACCESS_KEY_ID,
//   secretAccessKey: SECRET_ACCESS_KEY,
// });

/** multer upload function */
const uploadImg = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: BUCKET_NAME,
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
  return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
};

module.exports = {
  uploadImg,
  getUrlFromBucket,
};