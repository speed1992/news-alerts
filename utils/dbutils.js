const mongoose = require("mongoose")
const newsModel = require("../models/newsModel")
const { logger } = require("../config/logConfig")
const { dbConfig } = require("../config/config")

const URI = dbConfig.mongoDBURL;

async function updateVersionInDB(news, version) {
  return new Promise(async (_, reject) => {
    try {
      if (!news) {
        await newsModel.updateOne(
          { news_title: "create-react-app" },
          {
            news_title: "create-react-app",
            info: version
          },
          { upsert: true }
        )
      }
    } catch (e) {
      logger.info(e)
      reject(e);
    }
  });
}

module.exports.checkIfVersionExistsInDatabase = function (version) {
  return new Promise((resolve, reject) => {
    let status
    version = version.trim()
    newsModel.findOne({ info: version }, async (err, news) => {
      logger.info("news found?\n" + news)
      logger.info("error " + err)

      if (!err) {
        if (news) {
          logger.info("No need for updating DB")
          status = true
        } else {
          status = false
          logger.info("updating version in DB " + version)
          await updateVersionInDB(news, version)
        }
        resolve(status)
      } else {
        reject(err);
      }
    })
  });
}

module.exports.callbackWrapper = (callbackArray) => {
  callbackArray.map((callback) => {
    callback()
  })
}
module.exports.connectWithDatabase = (callbackArray) => {
  mongoose.connect(
    URI,
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    },
    () => {
      this.callbackWrapper(callbackArray)
    }
  )
}
