const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema(
  {
    news_title: {
      type: String,
      required: true,
      trim: true
    },
    info: {
      type: String,
      required: true,
      trim: true
    }
  },
  { versionKey: false }
)

module.exports = mongoose.model("News", newsSchema)
