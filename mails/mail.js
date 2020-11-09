var db = require("../db");
var nodemailer = require('nodemailer')
var help = require('../helpers/functions');
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
        console.log(body.data, body.data.length, body)
        mail = '<div style="width:80%; height: 90%; background-color: white">' + body.nom + ',';
        let content_header = '<p>Merci pour votre commande, nous la traiterons et vous contacterons dans les plus brefs délais.</p>';
        content_header += '<p>Adresse : ' + body.adresse + '</p>';
        let date = help.dateNow(new Date());
        content_header += '<p>Date de la commande : ' + date + '</p>';
        let content_command = "<hr style=`height: 1px;margin: -0.5em 0;padding: 0;color: #F00;background-color: #F00;border: 0;`/>" + "<p> COMMANDE :</p>";
        body.data.forEach(element => {
            let a = '<p>';
            a += + element.qte + ' - ' + element.nom + ' - ' + element.prix + " €";
            a += '<p/>'
            content_command += a;
        });
        content_command += '<p>Votre total de la commande : ' + body.total + ' €</p>';
        let content_footer = '<hr style=`height: 1px;margin: -0.5em 0;padding: 0;color: #F00;background-color: #F00;border: 0;`/><p>Le domaine Berger des vignes vous remercie pour votre commande, à très bientôt.</p>';
        mail = mail + content_header + content_command + content_footer + '</div>';


        mailOptions = {
            from: 'gmail',
            to: body.mail,
            // cc: 'bergerco@wanadoo.fr',
            subject: 'Commande - Domaine Berger des vignes',
            html: mail
        };


        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email send");
            }
        })

    },

    contactMail: function (req, callback) {
        var body = req.body;
        console.log('ooooooooo', body)

        mail = '<p>' + body.content + '</p>' + '<p>Expediteur : ' + body.name +'</p>' + '<p> Mail :' + body.mail + '</p>';


        mailOptions = {
            from: 'gmail',
            to: 'louis.gnolfi@isen.yncrea.fr',
            subject: 'Contact - Domaine Berger des vignes',
            html: mail
        };


        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email send");
            }
        })
    }
};

module.exports = mail;