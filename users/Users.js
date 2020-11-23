var db = require("../db");
var functions = require('../helpers/functions')
var bcrypt = require('bcryptjs');

var Users = {


  
  getUsers : function(req,callback){

    var body = req.body;
    var where = [];

    (typeof body.email != "undefined") ?
    Array.isArray(body.email)?
    where.push("email IN ('"+ body.email.join("','") +"')") : 
    where.push("email = '" + body.email + "'") :
    null;

    (typeof body.id != "undefined") ?
    Array.isArray(body.id)?
    where.push("id IN ('"+ body.id.join(",")+"')") : 
    where.push("id = '" + body.id + "'") :
    null;


    return (where.length > 0) ?  
    db.query("SELECT * from users WHERE " + where.join(" AND "), callback) : 
     db.query("SELECT * from users", callback);



  },
  insert: function (req, callback) {
    req = functions.cleanQuery(req);
    let date = functions.dateNow();

    var hashedPassword = bcrypt.hashSync(req.password, 8);

    return db.query(
      "INSERT INTO users (lastName,firstName,email,password,dateadded) VALUES ('" +
        req.lastName +
        "','"  +
        req.firstName +
        "','"+
        req.email +
        "','" +
        hashedPassword +
        "'," +
        date +
        "')",
      callback
    );
  },
  update : function(req,callback){
    let body=req.body
    var where = [];
    req = functions.cleanQuery(req);
      (typeof body.password!="undefined") ?
        where.push("password = '"+body.password+"'"):null;

      (typeof body.email!="undefined") ?
      where.push("email = '"+body.email+"'"):null;

      (typeof body.firstname!="undefined") ?
      where.push("firstname = '"+body.firstname+"'"):null;
      
      (typeof body.lastname!="undefined") ?
      where.push("lastname = '"+body.lastname+"'"):null;
      
      return(where.length>0) ? db.query("UPDATE users SET "+where.join( "AND" )+"WHERE id = "+body.id,callback) :
      db.query("UPDATE users SET "+where+" WHERE id = "+body.id,callback);
  },

  delete : function(req,callback){
        let body=req.body
        var where = [];
        req = functions.cleanQuery(req);

        (typeof body.firstname != "undefined") ?
        Array.isArray(body.firstname)?
        where.push("firstname IN ('"+ body.firstname.join("','") +"')") : 
        where.push("firstname = '"+body.firstname+"'") :
        null;
console.log("DELETE FROM users WHERE "+where.join("AND"));
console.log(where)

        return(where.length>0)? db.query("DELETE FROM users WHERE "+where.join("AND"),callback):null;
         
        

  },



};

module.exports = Users;
