var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const ActionUser = require("./User/actionUser");
const ActionOwner = require("./Owner/actionOwner");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/sendOrder", function(req, res){
    ActionUser.passerCommande(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
});

router.post("/addItems", function(req, res){
    ActionOwner.addItemDb(req, function(err,rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    })

})


router.post("/getImgById", function(req, res){
    ActionUser.getImgById(req, function(err,rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    })

})



module.exports = router