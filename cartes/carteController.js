var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Carte = require('./cartes')

router.post("/getCarte", function(req, res){
    Carte.getCarte(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCarte done')
        }
    })
})

module.exports = router