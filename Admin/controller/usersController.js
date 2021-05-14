const mysqlConnection = require("../../dbconfig");


//crud operations//

//getAllUsers//
exports.getAllUsers = function(req, res) {
    try {
        mysqlConnection.query('SELECT * FROM users Where isActive=true AND isbusy=false', (err, result) => {
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
}
//getAllUsers//

//create user//
exports.createUser = function(req, res) {
    try {
        const params={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            mobile:req.body.mobile,
            role:req.body.role,
            isActive:true,
            otp:req.body.otp,
            isbusy:false,
        }
        mysqlConnection.query('INSERT INTO users (userid, firstname, lastname, mobile,role,isactive,otp,isbusy) VALUES (uuid(),"' + params.firstName + '","' + params.lastName + '","' + params.mobile + '","' + params.role + '",' + params.isActive + ',"' + params.otp + '",' + params.isbusy + ')', (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "User created Successfully",
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " User creation Failed. Due to Error : " + err,
                });
            }
        })

    }
    catch (err) {
        res.status(500).send({
            message: " User creation Failed. Due to Error : " + err,
        });
    }
}
//create user//


//update user
exports.updateUser = function(req, res) {
    try {
        const params={
            userid:req.body.userid,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            mobile:req.body.mobile,
            role:req.body.role,
            isActive:true,
            otp:req.body.otp,
            isbusy:false,
        }
        
      mysqlConnection.query( "UPDATE users SET firstname=?,lastname=?,mobile=?,role=?,isactive=?,otp=?,isbusy=? WHERE userid = ?", [params.firstName,params.lastName,params.mobile,params.role,params.isActive,params.otp,params.isbusy, params.userid], (err, result) => {        
            if (!err) {
                res.status(200).send({
                    message: "User Updated Successfully"                    
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " User updation Failed. Due to Error : " + err,
                });
            }
        })

    }
    catch (err) {
        res.status(500).send({
            message: " User updation Failed. Due to Error : " + err,
        });
    }
}
//update user

//get user by id
exports.getUserById = function(req, res) {
    
    try {
        mysqlConnection.query('SELECT * FROM users Where userid = ?',req.params.userid, (err, result) => {
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
}
//get user by id

//delete user
exports.deleteUser = function(req, res) {
    
    try {
        mysqlConnection.query('DELETE FROM users WHERE userid = ?',req.params.userid, (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "Users deleted Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " User deletion Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " User deletion Failed. Due to Error : " + err,
        });
    }
}
//delete user