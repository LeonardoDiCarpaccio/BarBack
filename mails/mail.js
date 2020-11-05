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
console.log(body.data,body.data.length,body)

    mail = 'bonjour mr' + body.nom ;
        content_command = "";
    body.data.forEach(element => {
        let a = '<h1>';
        a += 'Quantité : ' + element.qte + " ; nom : " + element.nom + " ; prix : " + element.prix + "€";
        a += '<h1/>'
        content_command += a;
    });
    content_command += '<h1>Votre total de la commande : ' + body.total + '<h1/>';

    console.log(content_command);
    mail += content_command;
  


    
    mailOptions = {
        from: 'gmail',
        to: 'louis.gnolfi@isen.yncrea.fr',
        cc: 'bergerco@wanadoo.fr',
        subject : 'body.subject',
        html : mail
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