const moment = require('moment');
var otpGenerator = require('otp-generator');
const mysqlConnection = require("../dbconfig");
const SMS= require('../sms')
// Smoment.defaultFormat = "YYYY-MM-DD HH:mm:ss";

exports.startTime = async (req, res) => {
    try {
         console.log(moment(req.body.starttime).format('YYYY-MM-DD HH:mm'))
        
        const params = {
            mobile: req.body.userid,
            name: req.body.username,
            machineid: req.body.machineid,
            baseamount: req.body.hourlyamount,
            minutes: 0,
            totalamount: 0,
            startdate: moment(req.body.starttime).format('YYYY-MM-DD HH:mm'),
            paidstatus: 'un paid',
            invoiceid: 0,
            isstarted: true,
            startedtime: moment(req.body.starttime).format('YYYY-MM-DD HH:mm'),
            ispaused: false
        }
       // console.log(params)
        mysqlConnection.query('INSERT INTO billing (name,mobile, machineid, baseamount, minutes,totalamount,startdate,paidstatus,invoiceid,isstarted,startedtime,ispaused) VALUES' +


            ' ("' + params.name + '","' + params.mobile + '","' + params.machineid + '","' + params.baseamount + '","' + params.minutes + '","' + params.totalamount + '","' + params.startdate + '","'

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
            pausedtime: (moment(req.body.pausedtime).format('YYYY-MM-DD HH:mm')),

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
            startedtime: (moment(req.body.startedtime).format('YYYY-MM-DD  HH:mm')),

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
            endtime: (moment(req.body.endtime).format('YYYY-MM-DD HH:mm')),

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
        
        //  mysqlConnection.query('SELECT * FROM billing where mobile="'+req.body.mobile+'" isActive=true AND isbusy=false', (err, result) => {
            mysqlConnection.query('SELECT b.* ,m.machinename, m.uniqueid FROM users u INNER JOIN machines m ON u.uniqueid=m.uniqueid INNER JOIN billing b ON b.machineid=m.mobile1  where u.mobile="' + req.params.id + '" AND b.startdate>="' + start + '" AND b.startdate<="' + end + '" AND iscompleted=true', (err, result) => {
                // mysqlConnection.query('SELECT b.* , u.* ,m.machinename , m.mobile FROM users u inner join billing b on u.mobile= b.userid inner join machines m on b.machineid= m.mobile where u.mobile="' + req.params.id + '" AND b.startdate>="' + start + '" AND b.startdate<="' + end + '" AND iscompleted=true', (err, result) => {
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
exports.getuserBilldatabyunique = async (req, res) => {
    try {
       
        
        //  mysqlConnection.query('SELECT * FROM billing where mobile="'+req.body.mobile+'" isActive=true AND isbusy=false', (err, result) => {
            mysqlConnection.query('SELECT b.* ,m.machinename, m.uniqueid FROM users u INNER JOIN machines m ON u.uniqueid=m.uniqueid INNER JOIN billing b ON b.machineid=m.mobile1  where u.uniqueid="' + req.params.id + '" AND iscompleted=false', (err, result) => {
                // mysqlConnection.query('SELECT b.* , u.* ,m.machinename , m.mobile FROM users u inner join billing b on u.mobile= b.userid inner join machines m on b.machineid= m.mobile where u.mobile="' + req.params.id + '" AND b.startdate>="' + start + '" AND b.startdate<="' + end + '" AND iscompleted=true', (err, result) => {
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


exports.VerifyOTPforTimer  = async (req, res) => {
    try {
       
        mysqlConnection.query('SELECT * FROM machines where mobile1="'+req.body.mobilenumber+'" AND isactive=true', (err, result) => {
            if (!err && result.length) {                
                
                const machines = result

                if (req.body.otp === result[0].otp) {
                    res.status(200).send({
                        message: "Success",
                        data: machines,
                        token
                    });

                } else {
                    res.status(200).send({
                        message: "OTP not mached"                        
                    });
                }           
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " OTP fetch Failed. Due to Error : " + err,
                });
            }
        })

    } catch (err) {
        res.status(500).send({
            message: " OTP fetch Failed. Due to Error : " + err,
        });
    }
};

exports.sendOTPforTimer = async (req, res) => {
    try {
        console.log(req.params)
        mysqlConnection.query('SELECT * FROM machines where mobile1="'+req.params.mobile+'" AND isactive=true', (err, result) => {
            if (!err) {
                if(result.length){
                const machines = result
                const OTPnumber = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
                console.log(OTPnumber)

                mysqlConnection.query('update machines set otp="' + OTPnumber + '" where machineid="' + result[0].machineid + '"', (err1, otp) => {
                    if (!err) {
                SMS.sendSMS(OTPnumber,req.params.usermobile)

                    res.status(200).send({
                        message: "OTP resend Successfully",
                        data: machines,
                        OTPnumber
                    });
                }else{
                    console.log(err)
                }

                })
            }
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " OTP resend Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " OTP resend Failed. Due to Error : " + err,
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
            // mysqlConnection.query('SELECT b.* , m.* ,u.firstname, u.lastname , u.mobile FROM machines m inner join billing b on m.mobile1= b.machineid inner join users u on b.userid= u.mobile where m.mobile1="' + req.params.id + '" AND b.startdate>="' + start + '" AND b.startdate<="' + end + '" AND iscompleted=true', (err, result) => {
                mysqlConnection.query('SELECT b.* , m.machinename, m.uniqueid FROM machines m inner join billing b on m.mobile1= b.machineid where m.mobile1="' + req.params.id + '" AND b.startdate>="' + start + '" AND b.startdate<="' + end + '" AND iscompleted=true', (err, result) => {
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

