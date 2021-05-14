module.exports.config = {
  emailFeature: true,
  emailExceptions: true,
  textLine1: "New create-react-app version just got released",
  textLine2: "Check details:",
  appName: "create-react-app",
  subjectPhrase: "released!",
  regards: "\n\nThanks"
}

module.exports.APIConfig = {
  dev_URL: "https://jsonblob.com/api/d14686fe-ad24-11eb-8e44-d776b1fd8fae",
  prod_URL:
    "https://api.github.com/repos/facebook/create-react-app/releases/latest"
}

module.exports.dbConfig = {
  mongoDBURL: "mongodb+srv://paras:c6HXYesPd6ZE9oGJ@cluster0.gx9cg.mongodb.net/restful-db?retryWrites=true&w=majority"
}
