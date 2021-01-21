var db = require('../db');
const { isDef, cleanQuery } = require('../helpers/functions');

var Detail = {
    getDetail: function (req, callback) {
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
                return db.query('SELECT ' + target + ' FROM detail WHERE ' + table.join(" AND "), function(err,detail){
                    var result = (typeof detail != "undefined") ? Object.values(JSON.parse(JSON.stringify(detail))) : [];
                    result.forEach(element => {
                            typeof element.detail != "undefined" ? element.detail = JSON.parse(element.detail) : null
                            typeof element.location != "undefined" ? element.location = JSON.parse(element.location) : null

                    });
                    callback(null,result)
                });
            else
                return db.query('SELECT ' + target + ' FROM detail',function(err,detail){
                    var result = (typeof detail != "undefined") ? Object.values(JSON.parse(JSON.stringify(detail))) : [];
                    result.forEach(element => {
                        typeof element.detail != "undefined" ? element.detail = JSON.parse(element.detail) : null
                        typeof element.location != "undefined" ? element.location = JSON.parse(element.location) : null

                });
                    callback(null,result)

                });
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

        return db.query(
            "INSERT INTO detail (" +
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
            if (isDef(body.detail)) table.push("detail='" + body.detail + "'")
            if (isDef(body.location)) table.push("location='" + body.location + "'")
            if (table.length > 0) {
                let query = "UPDATE detail SET " + table.join(',') + " WHERE id =" + body.id
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

        if (table.length > 0) return db.query("DELETE FROM detail WHERE " + table.join(" AND "), callback)
        else return callback("ERROR PARAMETERS")
    }
}

module.exports = Detail