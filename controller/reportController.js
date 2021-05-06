const moment = require('moment');
const mysqlConnection = require("../dbconfig");

exports.reportbyDate = async (req, res) => {
    try {
        console.log(req.body)
        mysqlConnection.query('SELECT * FROM billing where userid="'+req.body.userid+'" AND startdate>="'+req.body.startdate+'" AND enddate<="'+req.body.enddate+'"', (err, result) => {
            if (!err) {
                console.log(result)   
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " User fetch Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " User fetch Failed. Due to Error : " + err,
        });
    }
};