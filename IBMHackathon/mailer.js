var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'svr8svr8@gmail.com',
    pass: 'codinglesson14@learn.com'
  }
});

module.exports = {
  send: function(toID, sub, body) {
    var mailOptions = {
      to: toID,
      subject: sub,
      text: body,
      // html: '<p> Your html here </p>'
      attachments: [
        {
          filename: 'message.wav',
          path: 'message.wav'
        }
      ]
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });
  }
}