exports.send = require("gmail-send")({
    user: "example@gmail.com",
    pass: "example",
    to: "speed1992@gmail.com",
    subject: "test subject"
  });

  exports.checkIfStringExists = function(FILE_LOCATION, searchString){
    fs.readFile(FILE_LOCATION, function (err, data) {
        if (err) throw err;
        if(data.indexOf(searchString) >= 0){
         return true;
        }
      });
  }
