var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Category = require('./Ci')


router.post("/script", function(req, res){
    Category.get(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})


module.exports = router