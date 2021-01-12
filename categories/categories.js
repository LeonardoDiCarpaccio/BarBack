var db = require("../db");
const { dateNow, cleanQuery, isDef } = require("../helpers/functions");
const { update } = require("../users/Users");


const Categories = {
    //GET
    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);

        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

        var where = [];
        // body : {"dateadded_inf" :"2020"}


        (typeof body.id_categorie != "undefined") ?
            Array.isArray(body.id_categorie) ?
                where.push("id_categorie IN (" + body.id_categorie.join(",") + ")") :
                where.push("id_categorie =" + body.id_categorie) : null;


        console.log("SELECT " + target + " FROM categories WHERE " + where.join(" AND "));
        (where.length > 0) ? db.query("SELECT " + target + " FROM categories WHERE " + where.join(" AND "), function (err, rows) {
            console.log(rows)
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];

        
            return callback(null, result);
        }) : db.query("SELECT " + target + " FROM categories ", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
          

            return callback(null, result);
        })


    },

    insert: function(req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);

        var keys = [];
        var values = [];
        for (const [key, value] of Object.entries(body)) {
            if (value != null) {
                typeof value == "string" ? values.push("'" + value + "'") : typeof value == "int" ? values.push(value) : values.push("'" + JSON.stringify(value) + "'")
                keys.push(key);
            }
        }
        return db.query(
            "INSERT INTO categories (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")",
            callback
        );
    },

    delete: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
    
        return db.query(
          "DELETE FROM categories WHERE id_categorie = '" + body.id_categorie+"'",
          callback
        );
      },
      //Upadate (body.id_categorie, body.name)
      update: function (req, callback) {
        let body = isDef(req.body) ? req.body : req;
        if (isDef(body.id_categorie)) {
            let table = []
            if (isDef(body.name)) table.push("name='" + body.name+ "'")
            if (table.length > 0) {
                let query = "UPDATE categories SET " + table.join(',') + " WHERE id_categorie =" + body.id_categorie
                return db.query(query, callback);

            } else return callback(null, "NOTHING WAS UPDATED")

        } else return callback("ERROR PARAMETERS")

    },

}

module.exports = Categories