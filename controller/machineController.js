var otpGenerator = require('otp-generator')
const jwt = require("jsonwebtoken");
const mysqlConnection = require("../dbconfig");
const SMS= require('../sms')


exports.getAllActiveMachines = async (req, res) => {

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

exports.getAllActiveMachinesbaseduser = async (req, res) => {

    try {
        mysqlConnection.query('SELECT * FROM machines where uniqueid="'+req.params.id+'" AND isactive=true AND isbusy=false', (err, result) => {
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

exports.getAllbusyeMachinesbaseduser = async (req, res) => {

    try {
        mysqlConnection.query('SELECT * FROM machines where uniqueid="'+req.params.id+'" AND isactive=true', (err, result) => {
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


exports.LoginasMachine = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM machines where mobile1="'+req.body.mobilenumber+'" AND isactive=true ', (err, result) => {
            if (!err) {
              //  console.log(result)
              if(result.length){
                  if(result[0].uniqueid===req.body.uniqueid){
                const machines = result
                const OTPnumber = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
                const userdata={
                    mobilenumber:result[0].mobile1,
                    role:result[0].role,
                }
                console.log(OTPnumber);
               

                mysqlConnection.query('update machines set otp="' + OTPnumber + '" where machineid="' + result[0].machineid + '"', (err1, otp) => {
                    if(!err1){
                SMS.sendSMS(OTPnumber,machines[0].mobile1 )

                    res.status(200).send({
                        message: "machines fetched Successfully",
                        data: machines,
                        OTPnumber                       
                    });
                }

                })
            }else{
                res.status(422).send({
                    message: "Invalid user unique id"
                });
            }
            }else{
                res.status(404).send({
                    message: "machine not found"
                });
            }

            }
            else {
                console.log(err);
                res.status(500).send({
                    message: "Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " User fetch Failed. Due to Error : " + err,
        });
    }
};

exports.VerifyOTPforMachine  = async (req, res) => {
    try {
       
        mysqlConnection.query('SELECT * FROM machines where mobile1="'+req.body.mobilenumber+'" AND isactive=true', (err, result) => {
            if (!err) {                
                const userdata={
                    role:result[0].role,
                    mobile:result[0].mobile1
                }
                var token = jwt.sign({
                    userdata
                }, 'supersecretkey', {
                    expiresIn: 32400, // expires in 24 hours
                })
                const machines = result

                if (req.body.otp === result[0].otp) {
                    res.status(200).send({
                        message: "Success",
                        data: machines,
                        token
                    });

                } else {
                    res.status(200).send({
                        message: "OTP not mached",
                        //data: machines,
                        //OTPnumber
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

exports.ResendOTPforMachine = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM machines where mobile1="'+req.params.mobile+'" AND isactive=true', (err, result) => {
            if (!err) {
                
                const machines = result
                const OTPnumber = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
                console.log(OTPnumber)

                mysqlConnection.query('update machines set otp="' + OTPnumber + '" where machineid="' + result[0].machineid + '"', (err1, otp) => {
                    if (!err) {
                SMS.sendSMS(OTPnumber,machines[0].mobile1)

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


exports.getallmachine = async (req, res) => {   
    try {
        mysqlConnection.query('SELECT * FROM machines where isactive=true ', (err, result) => {
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



exports.getActiveMachine = async (req, res) => {

    try {
        mysqlConnection.query('SELECT * FROM billing where machineid="'+req.params.id+'" AND iscompleted=false', (err, result) => {
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

exports.getActiveUser = async (req, res) => {

    try {
        mysqlConnection.query('SELECT * FROM billing where userid="'+req.params.id+'" AND iscompleted=false', (err, result) => {
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