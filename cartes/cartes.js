var db = require("../db");
const { dateNow, cleanQuery } = require("../helpers/functions");
const { update } = require("../users/Users");

const Carte = {
    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

        var where = [];
        // body : {"dateadded_inf" :"2020"}


        (typeof body.id_user != "undefined") ?
            Array.isArray(body.id_user) ?
                where.push("id_user IN (" + body.id_user.join(",") + ")") :
                where.push("id_user =" + body.id_user) : null;



        (where.length > 0) ? db.query("SELECT " + target + " FROM tb_carte WHERE " + where.join(" AND "), function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];

            result.forEach((el) => {
                typeof el.carte != "undefined" ? el.carte = JSON.parse(el.carte) : null;

            })
            return callback(null, result);
        }) : db.query("SELECT " + target + " FROM tb_carte ", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            result.forEach((el) => {
                typeof el.carte != "undefined" ? el.carte = JSON.parse(el.carte) : null;

            })

            return callback(null, result);
        })


    },
    insert: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
        body = cleanQuery(body);

        var keys = [];
        var values = [];
        for (const [key, value] of Object.entries(body)) {
            if (value != null) {
                typeof value == "string"
                    ? values.push("'" + value + "'")
                    : typeof value == "int" ?
                        values.push(value) : values.push("'" + JSON.stringify(value) + "'")
                keys.push(key);
            }
        }

        return db.query(
            "INSERT INTO tb_carte (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")",
            callback
        );
    },

    update: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
        body = cleanQuery(body);
        var carte = typeof body.carte != "undefined" ? JSON.stringify(body.carte) : null


        Carte.get({ id_user: body.id_user }, function (err, cartes) {
            if (cartes.length > 0 && carte !== null) {

                return db.query(
                    "UPDATE tb_carte SET carte = " + carte + "WHERE id_user = " + body.id_user,
                    callback
                );
            }
            else {
                callback(null, "no updated")
            }


        })


    },
    delete: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;

        return db.query(
            "DELETE FROM tb_carte WHERE id = " + body.id,
            callback
        );
    },





}
module.exports = Carte