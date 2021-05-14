const mysqlConnection = require("../../dbconfig");

exports.getAllBills = function(req, res) {
    try {
        mysqlConnection.query('SELECT * FROM billing', (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "billing fetched Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " billing fetch Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " User fetch Failed. Due to Error : " + err,
        });
    }
}



exports.getAllBillsByDate = function(req, res) {
    try {
        // let startdate=new Date(req.body.startdate);
        // let enddate=new Date(req.body.enddate);
        
        console.log(req.body)
        let startdate=req.body.startdate;
        let enddate=req.body.enddate;

        let userid=req.body.userid;
        let machineid=req.body.machineId;
        
        if(userid == undefined && machineid == undefined)
        {
            mysqlConnection.query(`SELECT billing.*, users.* ,machines.machineName FROM billing
            INNER JOIN users ON users.userid = billing.userid And  startdate >=  '${startdate}' AND enddate <= '${enddate}'INNER JOIN machines ON users.mobile = machines.mobile `, (err, result) => {
                if (!err) {
                    res.status(200).send({
                        message: "billing fetched Successfully",
                        data: result
                    });
                }
                else {
                    console.log(err);
                    res.status(404).send({
                        message: " billing fetch Failed. Due to Error : " + err,
                    });
                }
            })

        }
        //send only user id along with start and end date
        if(userid !== undefined && machineid === undefined){
            console.log(req.body)

            mysqlConnection.query(
                `SELECT billing.*, users.* ,machines.machineName FROM billing
                INNER JOIN users ON users.userid = billing.userid
                AND
                billing.userid = "${userid}"
                And  startdate >=  '${startdate}' AND enddate <= '${enddate}'INNER JOIN machines ON users.mobile = machines.mobile; `
     ,
              (err, result) => {
                if (!err) {
                    res.status(200).send({
                        message: "billing fetched Successfully",
                        data: result
                    });
                }
                else {
                    console.log(err);
                    res.status(404).send({
                        message: " billing fetch Failed. Due to Error : " + err,
                    });
                }
            })
            
        
        
        
        
        
        
        
        
        
        }
        //send only user id along with start and end date
        //send only machine id along with start and end date
        if(userid === undefined && machineid !== undefined){
            console.log(req.body)

            mysqlConnection.query(
                `SELECT billing.*, users.* ,machines.machineName FROM billing
                INNER JOIN users ON users.userid = billing.userid
                AND
                billing.machineid = "${machineid}"
                And  startdate >=  '${startdate}' AND enddate <= '${enddate}'INNER JOIN machines ON users.mobile = machines.mobile; `
     ,
              (err, result) => {
                if (!err) {
                    res.status(200).send({
                        message: "billing fetched Successfully",
                        data: result
                    });
                }
                else {
                    console.log(err);
                    res.status(404).send({
                        message: " billing fetch Failed. Due to Error : " + err,
                    });
                }
            })
                                                                            
        
        }
        //send only machine id along with start and end date


        if(userid !== undefined && machineid !== undefined)
        {
            mysqlConnection.query(`SELECT billing.*, users.* ,machines.machineName FROM billing
            INNER JOIN users ON users.userid = billing.userid And  startdate >=  '${startdate}' AND enddate <= '${enddate}'INNER JOIN machines ON users.mobile = machines.mobile `, (err, result) => {
                if (!err) {
                    res.status(200).send({
                        message: "billing fetched Successfully",
                        data: result
                    });
                }
                else {
                    console.log(err);
                    res.status(404).send({
                        message: " billing fetch Failed. Due to Error : " + err,
                    });
                }
            })

        }


       


    } catch (err) {
        res.status(500).send({
            message: " User fetch Failed. Due to Error : " + err,
        });
    }
}