var db = require('../db');
const { isDef, cleanQuery } = require('../helpers/functions');

var Items = {
    getItems : function (req, callback) {
        let body = isDef(req.body) ? req.body : req;
        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*";
        let table = [];

        if (isDef(body)) {
            if (isDef(body.id)) {
                (Array.isArray(body.id))
                    ? table.push("id IN (" + body.id.join(',') + ")")
                    : table.push("id = " + body.id)
            }

            if (table.length > 0)
                return db.query('SELECT ' + target + ' FROM items WHERE ' + table.join(" AND "), callback);
            else
                return db.query('SELECT ' + target + ' FROM items', callback);
        } else {
            return callback('ERROR PARAMETERS');
        }
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
console.log("INSERT INTO items (" +
keys.join(",") +
") VALUES  (" +
values.join(",") +
")")
        return db.query(
            "INSERT INTO items (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")",
            callback
        );
    },

    update: function (req, callback) {
        let body = isDef(req.body) ? req.body : req;
        console.log(body, isDef(body.id))
        if (isDef(body.id)) {
            let table = []
            if (isDef(body.nom)) table.push("name='" + body.name + "'")
            if (isDef(body.prix)) table.push("price=" + body.price)
            if (isDef(body.id_category)) table.push("id_category=" + body.id_category)
            if (isDef(body.description)) table.push("description='" + body.description + "'")
            if (isDef(body.img)) table.push("img='" + body.img + "'")
            if (table.length > 0) {
                let query = "UPDATE items SET " + table.join(',') + " WHERE id =" + body.id
                return db.query(query, callback);

            } else return callback(null, "NOTHING WAS UPDATED")

        } else return callback("ERROR PARAMETERS")

    },

    delete: function (req, callback) {
        let body = isDef(req.body) ? req.body : req;
        let table = [];

        if (isDef(body.id)) {
            (Array.isArray(body.id))
                ? table.push("id IN (" + body.id.join(',') + ")")
                : table.push("id = " + body.id)
        }

        if (table.length > 0) return db.query("DELETE FROM items WHERE " + table.join(" AND "), callback)
        else return callback("ERROR PARAMETERS")
    }
}

module.exports = Items;