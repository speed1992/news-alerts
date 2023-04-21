const express = require("express");
const { start } = require("../app");
const { credentials } = require("../config/credentials");
const { getDateAndTime } = require("../utils/dateUtils");
const { sendMail } = require("../utils/mailUtils");
const { slackPing } = require("../utils/slack");
const app = express();
const port = process.env.PORT || 80;

app.get("/health", (req, res) => {
  const log = 'Route "/" hit. Ran successfully at ' + getDateAndTime();

  // slackPing(log);

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  start(res);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
