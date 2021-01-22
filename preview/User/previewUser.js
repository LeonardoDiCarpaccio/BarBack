const category = require("../../category/category");
const City = require("../../city/city");
const Cartes = require('../../cartes/menu');
const Items = require('../../items/items');
var db = require("../../db");
const { dateNow, cleanQuery, TableJsonId, TableJsonIdSpecificKey, isDef, isDefArray } = require("../../helpers/functions");
const Users = require("../../users/Users");

const PreviewUser = {

    getCityFiltered: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var where = []

        if (
            typeof body.city != "undefined" &&
            body.city.length > 0
        ) {

            where.push("city LIKE '" + body.city + "%'");

        }
        db.query("SELECT city FROM tb_city WHERE " + where, function (err, rows) {
            if (err || rows.length === 0) { callback(err, "no town found") }
            else {
                callback(null, rows)
            }
        })
    },
    previewOwnerListByTown: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var city = typeof body.city != "undefined" ? body.city : null
        var res = {}
        var arrayIdOwner = []
        var id_category = []
        if (city !== null) {
            City.get({ city: city, only: ["id_owner"] }, function (err, owner) {
                console.log("owner",owner)
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

                    Users.get({ id_user: arrayIdOwner, only: ["id_user,name_institution,role,id_category,img"] }, function (err, users) {
                        if (err || users.length === 0) {
                            callback(err, "no bar")
                        } else {
                            console.log(users)

                            users.forEach((el, index) => {

                                if (el.role !== 2) {
                                    users.splice(index, 1)
                                } else {
                                    id_category.push(el.id_category)
                                }
                            })
                            category.get({ id: id_category }, function (err, category) {
                                console.log(category)
                                if (err || category.length === 0) { callback(err, "no category") }
                                else {
                                    console.log(category)
                                    var obj = {}
                                    res["category"] = TableJsonIdSpecificKey(obj, category, "id", "name")
                                    res["owner"] = users
                                    console.log("res",res)
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
                console.log("cartes",res)
                if (err) return callback(err, 'CANNOT GET CARTES');
                id_items = res[0].menu
                if (isDef(id_items) || isDefArray(id_items)) {
                    Items.getItems({ id: id_items }, function (err, resItems) {
                        if (err) return callback(err, "error getItems");
                        carteObject['cartes'] = {};
                        resItems.forEach((el, i) => {
                            if (isDef(el.id_category) && id_cat.indexOf(el.id_category) == -1) id_cat.push(el.id_category);
                            let objectToInject = {
                                "nom": el.name,
                                "prix": el.price,
                                "description": el.description
                            };  
                            if(!isDef(carteObject.cartes[el.id_category])){
                                carteObject.cartes[el.id_category] = [];
                                carteObject.cartes[el.id_category].push(objectToInject);
                            }else{
                                carteObject.cartes[el.id_category].push(objectToInject)
                            }
                        });
                        category.get({ id_category: id_cat }, function (err, category) {
                            console.log(category)
                            if (err || category.length === 0) { callback(err, "no category") }
                            else {
                                carteObject["category"] = TableJsonIdSpecificKey({}, category, "id_category", "name");
                                console.log(carteObject)
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