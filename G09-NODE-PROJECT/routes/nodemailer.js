const routes = require('express').Router();
require('dotenv').config();
var nodemailer = require('nodemailer');


routes.post('/email', (req, res) =>{

  var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASS_EMAIL
      },
      rejectUnauthorized: false
  });  

  
  var mailOptions = {
   
    from: process.env.USER_EMAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.content,
   
    
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error while sending mail: ' + error);
    } else {
        console.log('Message sent: %s', info.messageId);
    }
    transport.close();
});  

})

module.exports = routes;
