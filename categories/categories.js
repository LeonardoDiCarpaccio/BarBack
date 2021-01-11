var db = require("../db");
const { dateNow, cleanQuery } = require("../helpers/functions");
const { update } = require("../users/Users");


const Categories = {

    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);

        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

        var where = [];
        // body : {"dateadded_inf" :"2020"}


        (typeof body.id_categories != "undefined") ?
            Array.isArray(body.id_categories) ?
                where.push("id_categories IN (" + body.id_categories.join(",") + ")") :
                where.push("id_categories =" + body.id_categories) : null;


        console.log("SELECT " + target + " FROM categories WHERE " + where.join(" AND "));
        (where.length > 0) ? db.query("SELECT " + target + " FROM tb_carte WHERE " + where.join(" AND "), function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];

        
            return callback(null, result);
        }) : db.query("SELECT " + target + " FROM categories ", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
          

            return callback(null, result);
        })


    },

}

module.exports = Categories