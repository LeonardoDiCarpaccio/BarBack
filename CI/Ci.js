
const { exec } = require("child_process");


const Category = {
    //GET
    get: function (req, callback) {
       

        exec("cd../ & git pull origin main", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });

    },


}

module.exports = Category