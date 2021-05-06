var otpGenerator = require('otp-generator')
const jwt = require("jsonwebtoken");

const machineModel = require("../model/machineModel");
const mysqlConnection = require("../dbconfig");

exports.getAllActiveUser = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM users isActive=true AND isbusy=false', (err, result) => {
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

exports.signUp = async (req, res) => {
    try {
        const OTPnumber = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        console.log(OTPnumber)

        const params={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            mobile:req.body.mobile,
            role:req.body.role,
            isActive:true,
            otp:OTPnumber,
            isbusy:false,
        };
         mysqlConnection.query('INSERT INTO users (userid, firstname, lastname, mobile,role,isactive,otp,isbusy) VALUES (uuid(),"' + params.firstName + '","' + params.lastName + '","' + params.mobile + '","' + params.role + '",' + params.isActive + ',"' + params.otp + '",' + params.isbusy + ')', (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "User added Successfully",
                    data: result

                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " User add Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " User add Failed. Due to Error : " + err,
        });
    }
};


exports.Login = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM users where mobile="'+req.body.mobilenumber+'" AND isactive=true AND isbusy=false', (err, result) => {
            if (!err) {
              //  console.log(result)
                const users = result
                const OTPnumber = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
                const userdata={
                    mobilenumber:result[0].mobile,
                    role:result[0].role,
                }
                console.log(OTPnumber);
               

                mysqlConnection.query('update users set otp="' + OTPnumber + '" where userid="' + result[0].userid + '"', (err1, otp) => {
                    res.status(200).send({
                        message: "Users fetched Successfully",
                        data: users,
                        OTPnumber                       
                    });

                })

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


exports.VerifyOTP = async (req, res) => {
    try {
       
        mysqlConnection.query('SELECT * FROM users where mobile="'+req.body.mobilenumber+'" AND isactive=true AND isbusy=false', (err, result) => {
            if (!err) {
                console.log(result)
                const userdata={
                    role:result[0].role,
                    mobile:result[0].mobile
                }
                var token = jwt.sign({
                    userdata
                }, 'supersecretkey', {
                    expiresIn: 32400, // expires in 24 hours
                })
                const users = result

                if (req.body.otp === result[0].otp) {
                    res.status(200).send({
                        message: "Success",
                        data: users,
                        token
                    });

                } else {
                    res.status(200).send({
                        message: "OTP not mached",
                        //data: users,
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

exports.ResendOTP = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM users where mobile="'+req.params.mobile+'" AND isactive=true AND isbusy=false', (err, result) => {
            if (!err) {
                console.log(result)
                const users = result
                const OTPnumber = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
                console.log(OTPnumber)

                mysqlConnection.query('update users set otp="' + OTPnumber + '" where userid="' + result[0].userid + '"', (err1, otp) => {
                    res.status(200).send({
                        message: "OTP resend Successfully",
                        data: users,
                        OTPnumber
                    });

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

