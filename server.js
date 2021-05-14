const express = require("express");
const { start } = require("./app");
const { getDateAndTime } = require("./utils/dateUtils");
const { slackPing } = require("./utils/slack");
const app = express();
const port = 80;

app.get("/", (req, res) => {
  slackPing("Route \"/\" hit. Ran successfully at " + getDateAndTime())
  res.sendStatus(200);
})

app.get("/start", (req, res) => {
  start();
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})