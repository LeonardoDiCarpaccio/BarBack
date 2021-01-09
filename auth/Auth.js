var db = require("../db");
const { dateNow } = require("../helpers/functions");


var Auth = {


    connect: function (req, callback) {


        var body = req.body
        console.log()
        db.query("SELECT * FROM user WHERE pseudo = '" + body.pseudo + "' AND password = '" + body.password + "'", callback)

    },

    register: function (req, callback) {

        // need work on role = 2 about town and insert into tb_ville
        var body = req.body
        var column = ['date_added']
        var values = [dateNow()]
        if (typeof (body.email) !== "undefined") {
            column.push('email')
            values.push(body.email)
        }
        if (typeof (body.password) !== "undefined") {
            column.push('password')
            values.push(body.password)
        }
        if (typeof (body.role) !== "undefined") {
            column.push('role')
            values.push(body.role)
        }
        if (typeof (body.first_name) !== "undefined") {
            column.push('first_name')
            values.push(body.first_name)
        }
        if (typeof (body.last_name) !== "undefined") {
            column.push('last_name')
            values.push(body.last_name)
        }
        if (typeof (body.tel) !== "undefined") {
            column.push('tel')
            values.push(body.tel)
        }
        if (typeof (body.adresse) !== "undefined") {
            column.push('adresse')
            values.push(JSON.stringify(body.adresse))
        }
        if (typeof (body.Siret) !== "undefined") {
            column.push('Siret')
            values.push(body.Siret)
        }
        if (typeof (body.id_type) !== "undefined") {
            column.push('id_type')
            values.push(body.id_type)
        }
        if (typeof (body.id_spe) !== "undefined") {
            column.push('id_spe')
            values.push(body.id_spe)
        }
        if (typeof (body.name_institution) !== "undefined") {
            column.push('name_institution')
            values.push(body.name_institution)
        }
        if (typeof (body.birthday) !== "undefined") {
            column.push('birthday')
            values.push(body.birthday)
        }
        db.query("SELECT email FROM user WHERE email ='"+body.email+"'",function(err,user){
                console.log(user)
                console.log("length"+user.length)
            if(user.length>0){
                callback(err,"User already exist")
            }
            else {
                db.query("INSERT INTO user (" + column.join(",") + ") VALUES ('" + values.join("','") + "')",
                function (err, response) {
                    if (err) {
                        callback(err, "can not insert")
                    }
                    else {
                        if (body.role === 1) {
                            
                            callback(null, "register OK")
                        }
                        else {
                            const dehka = JSON.parse(body.adresse)
                            return db.query("SELECT * FROM tb_ville WHERE ville = '" + dehka.ville + "'", function (err, citys) {
                                if(citys.length>0){
                                    console.log(citys)
                                    const fulldehka = JSON.parse(citys[0].id_owner)
                                    fulldehka.array.push({id_owner : response.insertId})
                                    citys[0].id_owner = JSON.stringify(fulldehka) 
                                    console.log(citys[0].id_owner)
                                    db.query("UPDATE tb_ville SET id_owner = "+JSON.stringify(citys[0].id_owner)+" WHERE ville = '"+ dehka.ville +"'",callback)
                                }
                                else{
                                    const tempo = [{id_owner : response.insertId}]
                                    resElse={
                                        array : tempo
                                    }
                                   db.query("INSERT INTO tb_ville (ville,id_owner) VALUES ('"+dehka.ville+"','"+JSON.stringify(resElse)+"')",callback)
                                }
    
    
                            })
                        }
                    }
                }) 
            }
      
        })
             
    },



    login: function (req, callback) {

        var body = req.body;
        var where = [];
        console.log("entering in login");
        console.log("imbody" + body.email);
        (typeof body.email != "undefined") ?

            where.push("email = '" + body.email + "'") :
            null;

        (typeof body.password != "undefined") ?
            where.push("password = '" + body.password + "'") :
            null;

        return (where.length > 0) ?
            db.query("SELECT * FROM user WHERE " + where.join(" AND "), callback) : null




    },



};




module.exports = Auth;