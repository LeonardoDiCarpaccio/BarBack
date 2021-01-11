var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const ActionUser = require("./User/actionUser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/passercommande", function(req, res){
    ActionUser.passerCommande(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
            console.log('getTown done')
        }
    })
})



module.exports = router