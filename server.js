const express = require("express");
const { start } = require("./app");
const { credentials } = require("./config/credentials");
const { getDateAndTime } = require("./utils/dateUtils");
const { sendMail } = require("./utils/mailUtils");
const { slackPing } = require("./utils/slack");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const log = "Route \"/\" hit. Ran successfully at " + getDateAndTime()

  sendMail({
    text: appStartedMessage + "at " + getDateAndTime(),
    subject: "App launch",
    bcc: credentials.recipients
  })
  slackPing(log)

  res.sendStatus(200);
})

app.get("/start", (req, res) => {
  start();
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})