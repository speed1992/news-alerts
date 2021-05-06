
const axios = require('axios');
const { credentials } = require('../config/credentials');
const { logger } = require('../config/logConfig');

run().catch(err => logger.info(err));

async function run(channelName, text) {
    const url = 'https://slack.com/api/chat.postMessage';
    const res = await axios.post(url, {
        channel: channelName,
        text
    }, { headers: { authorization: `Bearer ${credentials.slackToken}` } });

    logger.info('Slack message sent', res.data);
}

function slackError(text) {
    run("#errors", text)
}

function slackSuccess(text) {
    run("#news", text)
}

module.exports.slackError = slackError;
module.exports.slackSuccess = slackSuccess;
