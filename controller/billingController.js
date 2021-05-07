
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
                    mysqlConnection.query('update users set isbusy=true where mobile="' + params.userid + '"', (err1, otp) => {
                        if (!err1) {

                           
                        }

                    })
                    mysqlConnection.query('update machines set isbusy=true where mobile="' + params.machineid + '"', (err2, otp) => {
                        if (!err2) {

                           
                        }

                    })
                    res.status(200).send({
                        message: "Report added Successfully",
                        data: result,
                        id: result.insertId,

                    })
                   
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
               
                var start = moment(result[0].startedtime)
                var end = moment(params.pausedtime)
                var time = end.diff(start)
                time = time / 1000;
                time = time / 60;
                time = parseFloat(result[0].minutes) + time

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
               
                if(result.length){
                const oldData=result
                var start = result[0].startedtime !== null ? moment(result[0].startedtime) : moment(result[0].pausedtime)
                var end = moment(params.endtime)
                var time = end.diff(start)
                time = time / 1000;
                time = time / 60;
                time = parseFloat(result[0].minutes) + time

                var amount = result[0].baseamount * time
                amount = Math.round(amount / 60)
                mysqlConnection.query('update billing set enddate="' + params.endtime + '", totalamount="' + amount + '" ,pausedtime=null, ispaused=false, minutes="' + time + '", startedtime=null, iscompleted=true, isstarted=false where id=' + req.body.id + '', (err, result2) => {
                    if (!err) {
                        mysqlConnection.query('update users set isbusy=false where mobile="' + result[0].userid + '"', (err1, otp) => {
                            if (!err1) {
    
                               ;
                            }
    
                        })
                        mysqlConnection.query('update machines set isbusy=false where mobile="' + result[0].machineid + '"', (err2, otp) => {
                            if (!err2) {
    
                               ;
                            }
    
                        })
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



// get user bill  list and user bill details
exports.getuserBilldata = async (req, res) => {
    try {
        const range = req.params.start
        var start = '';
        var end = '';
        if (range == '1') {
            start = moment().subtract(0, 'days').format('YYYY-MM-DD 00:00:00 ')
            end = moment().subtract(0, 'days').format('YYYY-MM-DD 23:59:59 ')
        } else if (range == '-1') {
            start = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00')
            end = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-7') {
            start = moment().startOf('week').format('YYYY-MM-DD 00:00:00')
            end = moment().format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-14') {
            start = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD 00:00:00')
            end = moment().startOf('week').format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-30') {
            start = moment().startOf('months').format('YYYY-MM-DD 00:00:00')
            end = moment().format('YYYY-MM-DD 23:59:59 ')
        } else if (range == '-60') {
            start = moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD 00:00:00')
            end = moment().subtract(1, 'months').endOf('months').format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-365') {
            start = moment().subtract(0, 'years').startOf('years').format('YYYY-MM-DD 00:00:00')
            end = moment().format('YYYY-MM-DD 23:59:59 ')
        } else if (range == '-730') {
            start = moment().subtract(1, 'years').startOf('years').format('YYYY-MM-DD 00:00:00')
            end = moment().subtract(1, 'years').endOf('years').format('YYYY-MM-DD 23:59:59 ')
        }

        // mysqlConnection.query('SELECT * FROM billing where mobile="'+req.body.mobile+'" isActive=true AND isbusy=false', (err, result) => {
        mysqlConnection.query('SELECT b.* , u.* ,m.machinename , m.mobile FROM users u inner join billing b on u.mobile= b.userid inner join machines m on b.machineid= m.mobile where u.mobile="' + req.params.id + '" AND b.startdate>="' + start + '" AND b.startdate<="' + end + '" AND iscompleted=true', (err, result) => {
            if (!err) {
                //console.log('result',result)
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
        mysqlConnection.query('SELECT * FROM billing where userid="' + req.body.id + '" AND iscompleted=true', (err, result) => {
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



// machine bill and machine bill details

exports.getmachineBilldata = async (req, res) => {
  
    try {
        const range = req.params.start
        var start = '';
        var end = '';
        if (range == '1') {
            start = moment().subtract(0, 'days').format('YYYY-MM-DD 00:00:00 ')
            end = moment().subtract(0, 'days').format('YYYY-MM-DD 23:59:59 ')
        } else if (range == '-1') {
            start = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00')
            end = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-7') {
            start = moment().startOf('week').format('YYYY-MM-DD 00:00:00')
            end = moment().format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-14') {
            start = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD 00:00:00')
            end = moment().startOf('week').format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-30') {
            start = moment().startOf('months').format('YYYY-MM-DD 00:00:00')
            end = moment().format('YYYY-MM-DD 23:59:59 ')
        } else if (range == '-60') {
            start = moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD 00:00:00')
            end = moment().subtract(1, 'months').endOf('months').format('YYYY-MM-DD 23:59:59 ')
        }
        else if (range == '-365') {
            start = moment().subtract(0, 'years').startOf('years').format('YYYY-MM-DD 00:00:00')
            end = moment().format('YYYY-MM-DD 23:59:59 ')
        } else if (range == '-730') {
            start = moment().subtract(1, 'years').startOf('years').format('YYYY-MM-DD 00:00:00')
            end = moment().subtract(1, 'years').endOf('years').format('YYYY-MM-DD 23:59:59 ')
        }


        // mysqlConnection.query('SELECT * FROM billing where mobile="'+req.body.mobile+'" isActive=true AND isbusy=false', (err, result) => {
        // mysqlConnection.query('SELECT b.* , u.* ,m.machinename , m.mobile FROM users u inner join billing b on u.mobile= b.userid inner join machines m on b.machineid= m.mobile where u.mobile="'+req.params.id+'" AND b.startdate>="'+start+'" AND b.startdate<="'+end+'" ', (err, result) => {
        mysqlConnection.query('SELECT b.* , m.* ,u.firstname, u.lastname , u.mobile FROM machines m inner join billing b on m.mobile= b.machineid inner join users u on b.userid= u.mobile where m.mobile="' + req.params.id + '" AND b.startdate>="' + start + '" AND b.startdate<="' + end + '" AND iscompleted=true', (err, result) => {
            if (!err) {
                //console.log('result',result)
                res.status(200).send({
                    message: "Data fetched Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " data fetch Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " Data fetch Failed. Due to Error : " + err,
        });
    }
};

exports.getmachineBilldatabyid = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM billing where machineid="' + req.body.id + '" AND iscompleted=true', (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "Data fetched Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " Data fetch Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " User fetch Failed. Due to Error : " + err,
        });
    }
};

