var db = require("../db");
var functions = require('../helpers/functions')
var bcrypt = require('bcryptjs');
const { dateNow, cleanQuery } = require("../helpers/functions");

var Users = {


  get: function (req, callback) {
    var body = (typeof req.body != "undefined") ? req.body : req;
    body = cleanQuery(body);

    let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

    var where = [];
    // body : {"dateadded_inf" :"2020"}


    (typeof body.id_user != "undefined") ?
      Array.isArray(body.id_user) ?
        where.push("id_user IN (" + body.id_user.join(",") + ")") :
        where.push("id_user =" + body.id_user) : null;


    (where.length > 0) ? db.query("SELECT " + target + " FROM user WHERE " + where.join(" AND "), function (err, rows) {
      var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];

      return callback(null, result);
    }) : db.query("SELECT " + target + " FROM user ", function (err, rows) {
      var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];


      return callback(null, result);
    })


  },
  insert: function (req, callback) {
    var body = (typeof (req.body) != 'undefined') ? req.body : req;
    body = cleanQuery(body)
    body.password = bcrypt.hashSync(body.password, 8);
    var keys = [];
    var values = [];

    for (const [key, value] of Object.entries(body)) {
      if (value != null) {
        typeof value == "string"
          ? values.push("'" + value + "'")
          : values.push("'" + JSON.stringify(value) + "'");
          typeof value == 
        keys.push(key);
      }
    }

    keys.push("date_added");
    values.push("'"+dateNow()+"'");
   
    return db.query(
      "INSERT INTO user (" +
      keys.join(",") +
      ") VALUES  (" +
      values.join(",") +
      ")",
      callback
    );
  },
 
  update: function (req, callback) {
    let body = req.body
    var where = [];
    req = functions.cleanQuery(req);
    (typeof body.password != "undefined") ?
      where.push("password = '" + body.password + "'") : null;

    (typeof body.email != "undefined") ?
      where.push("email = '" + body.email + "'") : null;

    (typeof body.firstname != "undefined") ?
      where.push("firstname = '" + body.firstname + "'") : null;

    (typeof body.lastname != "undefined") ?
      where.push("lastname = '" + body.lastname + "'") : null;

    return (where.length > 0) ? db.query("UPDATE users SET " + where.join("AND") + "WHERE id = " + body.id, callback) :
      db.query("UPDATE users SET " + where + " WHERE id = " + body.id, callback);
  },

  delete: function (req, callback) {
    let body = req.body
    var where = [];
    req = functions.cleanQuery(req);

    (typeof body.firstname != "undefined") ?
      Array.isArray(body.firstname) ?
        where.push("firstname IN ('" + body.firstname.join("','") + "')") :
        where.push("firstname = '" + body.firstname + "'") :
      null;
    console.log("DELETE FROM users WHERE " + where.join("AND"));
    console.log(where)

    return (where.length > 0) ? db.query("DELETE FROM users WHERE " + where.join("AND"), callback) : null;



  },



};

module.exports = Users;
