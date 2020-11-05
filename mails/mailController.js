var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var mail = require("./mail")
var nodemailer = require('nodemailer')




router.post("/sendmail",function (req, res) {

    mail.sendMail(req, function(err, rows) {

        if(err) {
            res.status(400).json(err);
            console.log("erreur", err);
        }
        else{
            console.log('pas erreur');
            res.json(rows)
        } 
    });
  

  });

  
router.post("/contactmail",function (req, res) {

    mail.contactMail(req, function(err, rows) {

        if(err) {
            res.status(400).json(err);
            console.log("erreur", err);
        }
        else{
            console.log('pas erreur');
            res.json(rows)
        } 
    });
  

  });
  
  module.exports = router;
  