const mongoose = require("mongoose");
const newsModel = require("../models/newsModel");
const { logger } = require("../config/logConfig");
const { dbConfig } = require("../config/config");

const URI = dbConfig.mongoDBURL;

async function updateVersionInDB(news, version) {
  return new Promise(async (resolve, reject) => {
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
        resolve();
      }
    } catch (e) {
      logger.info(e);
      reject(e);
    }
  });
}

module.exports.checkIfVersionExistsInDatabase = function (version) {
  return new Promise(async (resolve, reject) => {
    let status;
    version = version.trim();
    try {
      const news = await newsModel.findOne({ info: version });
      logger.info("news found?\n" + news);
      if (news) {
        logger.info("No need for updating DB");
        status = true;
      } else {
        status = false;
        logger.info("updating version in DB " + version);
        await updateVersionInDB(news, version);
      }
      resolve(status);
    } catch (e) {
      logger.info("error " + e);

      reject(e);
    }
  });
};

module.exports.callbackWrapper = (callbackArray) => {
  callbackArray.map((callback) => {
    callback();
  });
};
module.exports.connectWithDatabase = async (callbackArray) => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  logger.info("Inside mongo now");
  this.callbackWrapper(callbackArray);
};
