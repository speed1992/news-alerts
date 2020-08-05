const newsModel = require("../models/newsModel");
const { logger } = require("../config/logConfig");
async function checkIfNewsExists(news, version) {
  try {
    if (!news) {
      await newsModel.updateOne(
        { news_title: "create-react-app" },
        {
          news_title: "create-react-app",
          info: version,
        },
        { upsert: true }
      );
      return false;
    }
  } catch (e) {
    logger.info(e);
  }
  return true;
}

exports.checkIfVersionExistsInDatabase = async function (version) {
  let status = false;
  await newsModel.findOne({ info: version }, async (err, news) => {
    logger.info("news found?\n" + news);

    if (!err) {
      status = await checkIfNewsExists(news, version);
    }
  });
  return status;
};
