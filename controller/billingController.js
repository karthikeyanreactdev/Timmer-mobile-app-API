
const moment = require('moment');
const mysqlConnection = require("../dbconfig");


exports.startTime = async (req, res) => {
    try {
        const params = {
            userid: req.body.userid,
            machineid: req.body.machineid,
            baseamount: req.body.hourlyamount,
            minutes: 0,
            totalamount: 0,
            startdate: (moment(req.body.starttime).format('YYYY-DD-MM HH:mm')),
            paidstatus: 'un paid',
            invoiceid: 0,
            isstarted: true,
            startedtime: (moment(req.body.starttime).format('YYYY-DD-MM HH:mm')),
            ispaused: false
        }
        mysqlConnection.query('INSERT INTO billing (userid, machineid, baseamount, minutes,totalamount,startdate,paidstatus,invoiceid,isstarted,startedtime,ispaused) VALUES' +


            ' ("' + params.userid + '","' + params.machineid + '","' + params.baseamount + '","' + params.minutes + '","' + params.totalamount + '","' + params.startdate + '","'

            + params.paidstatus + '","' + params.invoiceid + '",' + params.isstarted + ',"' + params.startedtime + '",' + params.totalamount + ')', (err, result) => {
                if (!err) {
                    res.status(200).send({
                        message: "Report added Successfully",
                        data: result,
                        id: result.insertId,

                    });
                }
                else {
                    console.log(err);
                    res.status(404).send({
                        message: " Report add Failed. Due to Error : " + err,
                    });
                }
            })


    } catch (err) {
        res.status(500).send({
            message: " Report add Failed. Due to Error : " + err,
        });
    }
};

exports.pauseTime = async (req, res) => {
    try {
        const params = {
            id: req.body.id,
            pausedtime: (moment(req.body.pausedtime).format('YYYY-DD-MM HH:mm')),

        }

        mysqlConnection.query('SELECT * FROM billing where id=' + req.body.id + '', (err, result) => {
            if (!err) {
                console.log(result)
                var start = moment(result[0].startedtime)
                var end = moment(params.pausedtime)               
                var time = end.diff(start)               
                time = time / 1000;
                time = time / 60; 
                time=parseFloat(result[0].minutes)+time             

                mysqlConnection.query('update billing set pausedtime="' + params.pausedtime + '", ispaused=true, minutes="' + time + '", startedtime=null where id=' + req.body.id + '', (err, result2) => {
                    if (!err) {
                        res.status(200).send({
                            message: "Report updated Successfully"                            
                        });
                    } else {
                        console.log(err);
                        res.status(404).send({
                            message: " Report update Failed. Due to Error : " + err
                        });
                    
                    }
                })
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " Report update Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " Report update Failed. Due to Error : " + err,
        });
    }
};


exports.resumeTime = async (req, res) => {
    try {
        const params = {
            id: req.body.id,
            startedtime: (moment(req.body.startedtime).format('YYYY-DD-MM HH:mm')),

        }

            // mysqlConnection.query('SELECT * FROM billing where id=' + req.body.id + '', (err, result) => {
            // if (!err) {
                // console.log(result)
                // var start = moment(result[0].startedtime)
                // var end = moment(params.pausedtime)
                // var time = end.diff(start)
                // time = time / 1000;
                // time = time / 60;              
                mysqlConnection.query('update billing set pausedtime=null , ispaused=false, startedtime="' + params.startedtime + '" where id=' + req.body.id + '', (err, result2) => {
                    if (!err) {
                        res.status(200).send({
                            message: "Report updated Successfully"                            
                        });
                    } else {
                        console.log(err);
                        res.status(404).send({
                            message: " Report update Failed. Due to Error : " + err
                        });
                    
                    }
                })
          //  }
            // else {
            //     console.log(err);
            //     res.status(404).send({
            //         message: " Report update Failed. Due to Error : " + err,
            //     });
            // }
       // })


    } catch (err) {
        res.status(500).send({
            message: " Report update Failed. Due to Error : " + err,
        });
    }
};


exports.stopTime = async (req, res) => {
    try {
        const params = {
            id: req.body.id,
            endtime: (moment(req.body.endtime).format('YYYY-DD-MM HH:mm')),

        }

        mysqlConnection.query('SELECT * FROM billing where id=' + req.body.id + '', (err, result) => {
            if (!err) {
                console.log(result)
                var start =result[0].startedtime!==null? moment(result[0].startedtime):moment(result[0].pausedtime)
                var end = moment(params.endtime)               
                var time = end.diff(start)               
                time = time / 1000;
                time = time / 60; 
                time=parseFloat(result[0].minutes)+time       
                
                var amount =result[0].baseamount*time
amount=amount/60
                mysqlConnection.query('update billing set enddate="' + params.endtime + '", totalamount="'+amount+'" ,pausedtime=null, ispaused=false, minutes="' + time + '", startedtime=null, iscompleted=true, isstarted=false where id=' + req.body.id + '', (err, result2) => {
                    if (!err) {
                        res.status(200).send({
                            message: "Report updated Successfully"                            
                        });
                    } else {
                        console.log(err);
                        res.status(404).send({
                            message: " Report update Failed. Due to Error : " + err
                        });
                    
                    }
                })
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " Report update Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " Report update Failed. Due to Error : " + err,
        });
    }
};




exports.getuserBilldata = async (req, res) => {
    console.log('body',req.params)
    try {
        // mysqlConnection.query('SELECT * FROM billing where mobile="'+req.body.mobile+'" isActive=true AND isbusy=false', (err, result) => {
            mysqlConnection.query('SELECT b.* , u.* FROM users u inner join billing b on u.mobile= b.userid where u.mobile="'+req.params.id+'" ', (err, result) => {
            if (!err) {
                console.log('result',result)
                res.status(200).send({
                    message: "Users fetched Successfully",
                    data: result
                });
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

exports.getuserBilldatabyid = async (req, res) => {
    try {
         mysqlConnection.query('SELECT * FROM billing where userid="'+req.body.id+'" AND iscompleted=true', (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "Users fetched Successfully",
                    data: result
                });
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


