const axios = require("axios");
const { credentials } = require("../config/credentials");
const { logger } = require("../config/logConfig");
const { handleFailure } = require("./utils");

async function run(channelName, text) {
  let res = {};
  try {
    const url = "https://slack.com/api/chat.postMessage";
    res = await axios.post(
      url,
      {
        channel: channelName,
        text,
      },
      { headers: { authorization: `Bearer ${process.env.SLACK_API_TOKEN}` } }
    );
    logger.info("Slack message sent\t\t", res.data);
  } catch (e) {
    logger.info(e);
  }
}

function slackError(text) {
  run("#apps", text);
}

function slackSuccess(text) {
  run("#apps", text);
}

function slackPing(text) {
  run("#apps", text);
}

module.exports.slackError = slackError;
module.exports.slackSuccess = slackSuccess;
module.exports.slackPing = slackPing;
