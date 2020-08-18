const mongoose = require("mongoose")
const newsModel = require("../models/newsModel")
const { logger } = require("../config/logConfig")

const URI = process.env.MONGODB_URL

async function updateVersionInDB(news, version) {
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
    throw e
  }
}

module.exports.checkIfVersionExistsInDatabase = async function (version) {
  let status = false
  version = version.trim()
  await newsModel.findOne({ info: version }, async (err, news) => {
    logger.info("news found?\n" + news)

    if (!err) {
      if (news) {
        logger.info("No need for updating DB")
        status = true
      } else {
        logger.info("updating version in DB " + version)
        await updateVersionInDB(news, version)
      }
    } else {
      throw err
    }
  })
  return status
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
