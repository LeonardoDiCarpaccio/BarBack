var mysql      = require('mysql');
var connection = mysql.createPool({
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock', //path to mysql sock in MAMP
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bar_lover'
});


module.exports=connection;
