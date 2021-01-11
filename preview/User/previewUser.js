const Categories = require("../../categories/categories");
const City = require("../../city/city");
const Cartes = require('../../cartes/cartes');
const Items = require('../../items/items');
var db = require("../../db");
const { dateNow, cleanQuery, TableJsonId, TableJsonIdSpecificKey, isDef, isDefArray } = require("../../helpers/functions");
const Users = require("../../users/Users");

const PreviewUser = {

    getTownFiltered: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var where = []

        if (
            typeof body.ville != "undefined" &&
            body.ville.length > 0
        ) {

            where.push("ville LIKE '" + body.ville + "%'");

        }
        db.query("SELECT ville FROM tb_ville WHERE " + where, function (err, rows) {
            if (err || rows.length === 0) { callback(err, "no town found") }
            else {
                callback(null, rows)
            }
        })
    },
    previewOwnerListByTown: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var ville = typeof body.ville != "undefined" ? body.ville : null
        var res = {}
        var arrayIdOwner = []
        var id_categorie = []
        if (ville !== null) {
            City.get({ ville: ville, only: ["id_owner"] }, function (err, owner) {
                if (err || owner.length === 0) { callback(err, "no bar") }

                else {
                    owner.forEach(element => {
                        if (typeof element.id_owner != "undefined") {
                            if (Array.isArray(element.id_owner) === true) {
                                element.id_owner.forEach((el) => arrayIdOwner.push(el))
                            }
                        }
                    });

                    if (arrayIdOwner.length === 0) {
                        callback(err, "no bar")
                    }

                    Users.get({ id_user: arrayIdOwner, only: ["id_user,name_institution,role,id_categorie"] }, function (err, users) {
                        if (err || users.length === 0) {
                            callback(err, "no bar")
                        } else {
                            console.log(users)

                            users.forEach((el, index) => {

                                if (el.role !== 2) {
                                    users.splice(index, 1)
                                } else {
                                    id_categorie.push(el.id_categorie)
                                }
                            })
                            Categories.get({ id_categorie: id_categorie }, function (err, categories) {
                                console.log(categories)
                                if (err || categories.length === 0) { callback(err, "no categories") }
                                else {
                                    console.log(categories)
                                    var obj = {}
                                    res["categories"] = TableJsonIdSpecificKey(obj, categories, "id_categorie", "name")
                                    res["owner"] = users
                                    callback(null, res)
                                }
                            })
                        }


                    })

                }

            })
        } else {
            callback(null, "no bar")
        }



    },

    getCarteByOwner: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var id_items = [];
        var id_cat = []
        let carteObject = {};
        if (isDef(body.id_owner) && !Array.isArray(body.id_owner)) {
            Cartes.get({ id_owner: body.id_owner }, function (err, res) {
                if (err) return callback(err, 'CANNOT GET CARTES');
                id_items = res[0].carte
                if (isDef(id_items) || isDefArray(id_items)) {
                    console.log('le getitem les doses', id_items)
                    Items.getItems({ id: id_items }, function (err, resItems) {
                        if (err) return callback(err, "error getItems");
                        console.log("ooooo", resItems);
                        carteObject['cartes'] = {};
                        resItems.forEach((el, i) => {
                            if (isDef(el.id_categorie) && id_cat.indexOf(el.id_categorie) == -1) id_cat.push(el.id_categorie);
                            console.log('---',i)
                            let objectToInject = {
                                "nom": el.nom,
                                "prix": el.prix,
                                "description": el.description
                            };  
                            if(!isDef(carteObject.cartes[el.id_categorie])){
                                carteObject.cartes[el.id_categorie] = [];
                                carteObject.cartes[el.id_categorie].push(objectToInject);
                            }else{
                                carteObject.cartes[el.id_categorie].push(objectToInject)
                            }
                        });
                        Categories.get({ id_categorie: id_cat }, function (err, categories) {
                            console.log(categories)
                            if (err || categories.length === 0) { callback(err, "no categories") }
                            else {
                                carteObject["categories"] = TableJsonIdSpecificKey({}, categories, "id_categorie", "name");
                                callback(null, carteObject)
                            }
                        })
                    });
                }
            });


        } else {
            return callback("id_owner not def or isArray")
        }


    }


}
module.exports = PreviewUser