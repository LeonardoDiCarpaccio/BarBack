var db = require("../db");


var Auth = {

login : function(req,callback){

    var body = req.body;
    var where = [];
    console.log("entering in login");
    console.log("imbody"+body.email);
    (typeof body.email != "undefined") ?
    Array.isArray(body.email)?
    where.push("email IN ('"+body.email.join("','") +"')") : 
    where.push("email = '"+body.email+"'") :
    null;

    return (where.length > 0) ?  
    db.query("SELECT * FROM users WHERE "+where.join(" AND "), callback) : 
     db.query("SELECT * FROM users WHERE "+where, callback);

 

},
};

module.exports = Auth;