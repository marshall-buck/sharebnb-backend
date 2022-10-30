"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "sharebnb_test"
    : process.env.DATABASE_URL || "sharebnb";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;



// // AWS S3 setup
const BUCKETEER_AWS_REGION = process.env.BUCKETEER_AWS_REGION;
const BUCKETEER_BUCKET_NAME = process.env.BUCKETEER_BUCKET_NAME;
const BUCKETEER_AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
const BUCKETEER_AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;





module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  BUCKETEER_AWS_ACCESS_KEY_ID,
  BUCKETEER_AWS_REGION,
  BUCKETEER_BUCKET_NAME,
  BUCKETEER_AWS_SECRET_ACCESS_KEY
};
