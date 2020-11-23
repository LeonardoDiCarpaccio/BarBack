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
}
   
}
module.exports = Carte