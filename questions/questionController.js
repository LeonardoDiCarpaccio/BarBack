var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Question = require("./question")




router.get("/getquestion/:theme",function (req, res) {

    Question.getQuestion(req, function(err, rows) {

        if(err) {
            res.status(400).json(err);
        }
        else{
            var send = Object.values(JSON.parse(JSON.stringify(rows)));
            console.log("rows",rows);
            console.log("send", send[0]);
            res.send(send[0]);
        } 
    })

 
  });
  
  module.exports = router;
  