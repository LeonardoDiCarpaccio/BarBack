var db = require("../db");
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // use SSL
        port: 25, // port for secure SMTP
    auth: {
        user: 'domainebergerdesvignes@gmail.com',
        pass: 'dbdv69480'
    },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions;

var mail = {

    sendMail: function (req, callback) {
    var body = req.body;
    mailOptions = {
        from: 'gmail',
        to: 'louisgnolfi@hotmail.fr',
        cc: 'bergerco@wanadoo.fr',
        subject : 'body.subject',
        text : body.text
    };


    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("email sent");
        }
    })
    },
};

module.exports = mail;