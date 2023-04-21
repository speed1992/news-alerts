const express = require("express");
const { start } = require("../app");
const { credentials } = require("../config/credentialss");
const { getDateAndTime } = require("../utils/dateUtilss");
const { sendMail } = require("../utils/mailUtilss");
const { slackPing } = require("../utils/slackk");
const app = express();
const port = process.env.PORT || 80;

app.get("/health", (req, res) => {
  const log = 'Route "/" hit. Ran successfully at ' + getDateAndTime();

  slackPing(log);

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  start(res);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
