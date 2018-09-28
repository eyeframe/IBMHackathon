const cmd = require('node-cmd');
const unirest = require("unirest");

var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");

req.headers({
  "authorization": "FLxBfjzcZQSG9Xy64UWqAhP0Nml2rdMEigowb7DaHICeukYvsKyJ5rVso8cN3mjIXKBSpQkDLntlFAwa"
});

module.exports = {
  run: function(command, callback) {
    cmd.get(command, function(err, data, stderr) {
      if(stderr) console.log(stderr);
      callback(data);
    });
  },

  sendMessage: function(data) {
    console.log('Sending Message...');
    req.form({
      "sender_id": "FSTSMS",
      "message": data.message,
      "language": "english",
      "route": "p",
      "numbers": data.to,
      "flash": "1"
    });
    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      console.log(res.body);
    });
  }

};

// {
//   to: "1234567890, 1234567890",
//   msg: '',
// }
