
const { exec } = require("child_process");


const Category = {
    //GET
    get: function (req, callback) {
       

        exec("cd .. & git pull origin main ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return callback(null,stdout);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                
                return callback(stderr,"fail")
            }
            console.log(`stdout: ${stdout}`);
        });

    },


}

module.exports = Category