var db = require("../db");
const { dateNow } = require("../helpers/functions");
const { update } = require("../users/Users");

const Carte ={
getCarte : function(req, callback)
{   
    var body=req.body
    console.log(body)
    return db.query("SELECT * FROM tb_carte Where id_user = " + body.id,
    function(err, carte){
        console.log(JSON.parse(carte[0].carte))
    var items = JSON.parse(carte[0].carte)
        var res = {
            id_user : carte[0].id_user,
            cat : []
        }
        var categories  = []
        items.forEach(element => {
            i = categories.findIndex(marsqfzergaaezfa => marsqfzergaaezfa === element.id_categorie) === -1
                    if(i){
                        categories.push(element.id_categorie)
                    }

        });
        categories.forEach((el)=>{
            res.cat.push({id_categorie : el,item  : []})
            })
            
            
            categories.forEach((element, index) => {
              items.forEach(el=>{
                if(element===el.id_categorie){
                   
                  res.cat[index].item.push(el)
                }
              })
            });
        console.log("mange ta mert")
        console.log(categories[0])
        console.log(categories[1])
        console.log(categories[2])
        callback(null, res)
    }
    )
},

getItems : function(req,callback){
var res ={
    tb_categories : null,
    cat : []
}
    var idArray = []
    db.query("SELECT * FROM categories",function(err,categories){
        if(err){
            console.log(err)
        }

        if(categories!=="undefined"){
            res.tb_categories = categories.slice()
            categories.forEach((el)=>{
                    idArray.push(el.id_categorie)
            })
        }

        idArray.forEach((el)=>{
                const tempo = categories.filter(element=>element.id_categorie===el)
                res.cat.push({id_categorie : el,items : tempo})
        })


        callback(null,res) 

    })
},

addCartes : function(req,callback){
  var body = req.body
  stringifyed = JSON.stringify(body.array)
  console.log(stringifyed)
db.query("INSERT INTO tb_carte (carte) VALUES ('"+stringifyed+"')",callback)
  
},




   
}
module.exports = Carte