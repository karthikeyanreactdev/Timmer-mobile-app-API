const machineModel = require("../model/machineModel");
const mysqlConnection = require("../dbconfig");



exports.getAllActive = async (req, res) => {

    try {
        mysqlConnection.query('SELECT * FROM machines where isactive=true AND isbusy=false', (err, result) => {
            if (!err) {                
                res.status(200).send({
                    message: "fetched Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(500).send({
                    message: " Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " Failed. Due to Error : " + err,
        });
    }
};