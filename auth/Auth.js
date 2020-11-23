const { response } = require("express");
var db = require("../db");


var Auth = {


connect : function(req,callback){


var body=req.body
console.log()
db.query("SELECT * FROM user WHERE pseudo = '"+body.pseudo+"' AND password = '"+body.password+"'",callback)

},

register : function(req,callback){
var body = req.body

var column = []
var values = []
if(body.email!=="undefined"){
    column.push('email')
    values.push(body.email)
}
if(body.password!=="undefined"){
    column.push('password')
    values.push(body.password)
}
if(body.role!=="undefined"){
    column.push('role')
    values.push(body.role)
}

db.query("INSERT INTO user ("+column.join(",")+") VALUES ('"+values.join("','")+"')",callback)
},



login : function(req,callback){

    var body = req.body;
    var where = [];
    console.log("entering in login");
    console.log("imbody"+body.email);
    (typeof body.email != "undefined") ?

    where.push("email = '"+body.email+"'") :
    null;

    (typeof body.password != "undefined") ?
    where.push("password = '"+body.password+"'") :
    null;

    return (where.length > 0) ?  
    db.query("SELECT * FROM user WHERE "+where.join(" AND "), callback) : null
 

 

},



};




module.exports = Auth;