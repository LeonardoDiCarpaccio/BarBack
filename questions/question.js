var db = require("../db");

var Question = {

    getQuestion: function (req, callback) {
        let i, id;
        switch (req.params.theme) {
            case ('question'):
                console.log('question');
                i = 4;
                id = Math.floor(Math.random() * i)+1;
                console.log(id);
                return db.query(`SELECT question, gage FROM tablequestions WHERE id=${id}`, callback);
               
            case ('action'):
                console.log('action');
                i = 3;
                id = Math.floor(Math.random() * i)+1;
                console.log(id);
                return db.query(`SELECT action, gage FROM tableactions WHERE id=${id}`, callback);
               
            case ('duel'):
                console.log('duel');
                i = 3;
                id = Math.floor(Math.random() * i)+1;
                console.log(id);
                return db.query(`SELECT duel, gage FROM tableduels WHERE id=${id}`, callback);
           
        }


    },
};

module.exports = Question;