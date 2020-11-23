var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Auth = require("./Auth")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");
var User = require("../users/Users");
var VerifyToken = require("./VerifyToken");

router.post("/register",function(req,res){
  Auth.register(req,function(err,row){
    if(err){
      console.log(err)
    }
    else{
      res.json(row)
    }
  })
})


router.post("/login", function (req , res) {
  console.log("login in")
  Auth.login(req, function (err, us) {
    if (err) return res.status(500).send("Error on the server.");

    var row = Object.values(JSON.parse(JSON.stringify(us)));
console.log(row)
    if (!row) return res.status(404).send("No user found.");
    var passwordIsValid = (row.length>0) ? row[0].password===req.body.password ? true : false : null;
    if(!passwordIsValid) return res.status("wrong password")

      var id = row[0].id_user;
      
      var role = row[0].role;
      console.log("id"+id)
     
     var token = jwt.sign({ userId: id,role : role}, config.secret, {
      expiresIn: "2h",
    });

console.log(token)
    const userInfo = {
      token,
      id,
      role
    }

   
    
     res.status(200).send(userInfo);  // { auth: true, token: token }
  });
});



router.get("/logout",function (req, res) {

  res.status(200).send({ auth: false, token: null });
});


router.get("/check", VerifyToken, function (req, res) {
console.log("checkout in")
  User.getUsers({id : req.userId}, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(401).send("No user found.");

    res.status(200).send(user);
    res.json(user);
  });
});

module.exports = router;
