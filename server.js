"use strict";

const app = require("./app");
const { PORT, HOSTNAME } = require("./config");

app.listen(PORT, HOSTNAME, function () {
  console.log(`Started on ${HOSTNAME}:${PORT} this is from server.js`);
});
