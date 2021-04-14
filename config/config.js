module.exports.config = {
  appMode: "production",
  emailFeature: true,
  emailExceptions: true,
  textLine1: "New create-react-app version just got released",
  textLine2: "Check details:",
  appName: "create-react-app",
  subjectPhrase: "released!",
  regards: "\n\nThanks"
}

module.exports.APIConfig = {
  dev_URL: "https://jsonblob.com/api/f13430d8-d313-11ea-bb09-433dc46d1195",
  prod_URL:
    "https://api.github.com/repos/facebook/create-react-app/releases/latest"
}

module.exports.dbConfig = {
  mongoDBURL: "mongodb+srv://paras:c6HXYesPd6ZE9oGJ@cluster0.gx9cg.mongodb.net/restful-db?retryWrites=true&w=majority"
}
