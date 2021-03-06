const category = require("../../category/category");
const City = require("../../city/city");
const Cartes = require('../../cartes/menu');
const Items = require('../../items/items');
var db = require("../../db");
const { dateNow, cleanQuery, TableJsonId, TableJsonIdSpecificKey, isDef, isDefArray } = require("../../helpers/functions");
const Users = require("../../users/Users");
const Order = require("../../order/order");
const Detail = require("../../detail/detail");

const PreviewUser = {

    getCityFiltered: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var where = []

        if (
            typeof body.city != "undefined" &&
            body.city.length > 0
        ) {

            where.push("city LIKE '%" + body.city + "%'");

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

                    Users.get({ id_user: arrayIdOwner, only: ["id_user,name_institution,role,id_category,img,description"] }, function (err, users) {
                        if (err || users.length === 0) {
                            callback(err, "no bar")
                        } else {
                            console.log(users,"users info get ")

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
        console.log("called",body)

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
                                "name": el.name,
                                "price": el.price,
                                "description": el.description,
                                "img": el.img
                                
                            };  
                            if(!isDef(carteObject.cartes[el.id_category])){
                                carteObject.cartes[el.id_category] = [];
                                carteObject.cartes[el.id_category].push(objectToInject);
                            }else{
                                carteObject.cartes[el.id_category].push(objectToInject)
                            }
                        });
                        category.get({ id: id_cat }, function (err, category) {
                            console.log(category)
                            if (err || category.length === 0) { callback(err, "no category") }
                            else {
                                carteObject["category"] = TableJsonIdSpecificKey({}, category, "id", "name");

                                Users.get({id_user : body.id_owner,only : ["name_institution"]},function(err,rows){
                                    if(err || rows == undefined){
                                        callback(err,"pb on get user")
                                    }else{

                                        carteObject["info"] =  rows[0]
                                        callback(null, carteObject)
                                    }
                                })
                            
                            }
                        })
                    });
                }
            });


        } else {
            return callback("id_owner not def or isArray")
        }


    },

    getOrderHisto : function(req,callback){
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var resp = {
            ngFor : [],
            id_owner : [],
            
        }
  
      var array_id_detail = []
        Order.get({num_commande : body.num_commande},function(err,order){
            if(err){ return callback(err,"wrong num_commande")}
            else{console.log(order)
                order.forEach((el)=>{
                    array_id_detail.find((elm)=>elm==el.id_detail)==undefined ? array_id_detail.push(el.id_detail) : null
                    resp.id_owner.find((elm)=>elm==el.id_owner)==undefined ? resp.id_owner.push(el.id_owner) : null

                  var a  = {
                      order : el,
                      
                  }
                  resp.ngFor.push(a)
                    
                })
// change res["order"].id_detail

                Detail.getDetail({id : array_id_detail},function(err,detail){
                    if(err){return callback(err,"wrong num_commande")}
                    else{
                        
                        detail.forEach((el)=>{
                            var idx = resp.ngFor.findIndex((eml)=>eml.order.id_detail==el.id)
                            resp.ngFor[idx]["detail"] = el
                        })
                        Users.get({id_user: resp.id_owner}, function(err, user){
                       
                        
                           
                           resp["owner"]= TableJsonId({}, user, "id_user")
                           
                        return callback(null,resp)
                        })
                   

                    }
                })
            }
        })

    }



}
module.exports = PreviewUser