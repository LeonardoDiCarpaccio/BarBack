var db = require("../db");
const { dateNow, cleanQuery } = require("../helpers/functions");
const { update } = require("../users/Users");

const Menu = {
    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);

        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 
        var where = [];
        // body : {"dateadded_inf" :"2020"}


        (typeof body.id_owner != "undefined") ?
            Array.isArray(body.id_owner) ?
                where.push("id_owner IN (" + body.id_owner.join(",") + ")") :
                where.push("id_owner =" + body.id_owner) : null;


        console.log("SELECT " + target + " FROM tb_menu WHERE " + where.join(" AND "));
        (where.length > 0) ? db.query("SELECT " + target + " FROM tb_menu WHERE " + where.join(" AND "), function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];

            result.forEach((el) => {
                typeof el.menu != "undefined" ? el.menu = JSON.parse(el.menu) : null;

            })
            return callback(null, result);
        }) : db.query("SELECT " + target + " FROM tb_menu ", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            result.forEach((el) => {
                typeof el.menu != "undefined" ? el.menu = JSON.parse(el.menu) : null;

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
            "INSERT INTO tb_menu (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")",
            callback
        );
    },

    update: function (req, callback) {
        var array = []
        var body = typeof req.body != "undefined" ? req.body : req;
        body = cleanQuery(body);
        var id_owner = typeof body.id_owner != "undefined" ? body.id_owner : null
        var id_item = typeof body.id_item != "undefined" ? body.id_item : null
        if (id_owner !== null || id_item !== null) {
            Menu.get({ id_owner: id_owner }, function (err, menus) {
                if (err || menus.length === 0) { callback(null, "no updated") }
                else {
                    menus.forEach((el) => {
                        if (typeof el.menu != "undefined") {
                            if (Array.isArray(el.menu) === true) {
                                el.menu.push(id_item)
                                array = [...el.menu]
                            } else {
                                array.push(id_item)

                            }
                        }
                    })
                    return db.query(
                        "UPDATE tb_Menu SET menu = '" + JSON.stringify(array) + "' WHERE id_owner = " + id_owner,
                        callback
                    );
                }
            })
        }else{
            callback(null, " wrong  id_item or id_user ")
        }


    },

    delete: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;

        return db.query(
            "DELETE FROM tb_menu WHERE id = " + body.id,
            callback
        );
    },

    





}
module.exports = Menu