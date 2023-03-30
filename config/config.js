module.exports.config = {
  emailFeature: true,
  emailExceptions: true,
  textLine1: "New create-react-app version just got released",
  textLine2: "Check details:",
  appName: "create-react-app",
  subjectPhrase: "released!",
  regards: "\n\nThanks",
};

module.exports.APIConfig = {
  dev_URL: "http://localhost:3000/data",
  prod_URL:
    "https://api.github.com/repos/facebook/create-react-app/releases/latest",
};

module.exports.dbConfig = {
  mongoDBURL:
    "mongodb+srv://paras:g325L5Y9ivCykRwP@cluster0.gx9cg.mongodb.net/restful-db?retryWrites=true&w=majority",
};
