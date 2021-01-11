var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const ActionUser = require("./User/actionUser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/getTownFiltered", function(req, res){
    PreviewUser.getTownFiltered(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getTown done')
        }
    })
})



module.exports = router