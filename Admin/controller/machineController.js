const mysqlConnection = require("../../dbconfig");

exports.getAllMachine = function(req, res) {
    try {
        mysqlConnection.query('SELECT * FROM machines', (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "machine fetched Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: "machine fetch Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: "machine fetch Failed. Due to Error : " + err,
        });
    }
}



//get machine by id
exports.getMachineById = function(req, res) {
    
    try {
        mysqlConnection.query('SELECT * FROM machines  Where machineid = ?',req.params.machineid, (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "machines fetched Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: "machines fetch Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: " User fetch Failed. Due to Error : " + err,
        });
    }
}
//get machine by id


//update machine
exports.updateMachine = function(req, res) {
    try {
        const params={
            machineid:req.body.machineid,
            machineName:req.body.machineName,            
            mobile:req.body.mobile            
        }
        
      mysqlConnection.query( "UPDATE machines SET machineName=?,mobile=? WHERE machineid = ?", [params.machineName,params.mobile,params.machineid], (err, result) => {        
            if (!err) {                
                res.status(200).send({
                    message: "Machine Updated Successfully"                    
                });
            }
            else {                
                res.status(200).send({                    
                    message: "Machine updation Failed. Due to Error : " + err,
                    error:err.code
                });
            }
        })

    }
    catch (err) {
        res.status(500).send({
            message: " Machine updation Failed. Due to Error : " + err,
        });
    }
}
//update machine


//delete machine
exports.deleteMachine = function(req, res) {
    
    try {
        mysqlConnection.query('DELETE FROM machines WHERE machineid = ?',req.params.machineid, (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "Machine deleted Successfully",
                    data: result
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: " Machine deletion Failed. Due to Error : " + err,
                });
            }
        })


    } catch (err) {
        res.status(500).send({
            message: "Machine deletion Failed. Due to Error : " + err,
        });
    }
}
//delete machine


//create machine//
exports.createMachine = function(req, res) {
    try {
        const params={
            machineName:req.body.machineName,            
            mobile:req.body.mobile,
            isActive:true,
            otp:'',
            isBusy:false,
            role:'machine'
            
        }
        mysqlConnection.query('INSERT INTO machines (machineid,machineName,mobile,isActive,otp,isbusy,role) VALUES (uuid(),"' + params.machineName + '","' + params.mobile+ '",' + params.isActive + ',"' + params.otp+ '",' + params.isBusy + ',"' + params.role+ '")', (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: "machine created Successfully",
                });
            }
            else {
                console.log(err);
                res.status(404).send({
                    message: "machine creation Failed. Due to Error : " + err,
                });
            }
        })

    }
    catch (err) {
        res.status(500).send({
            message: "machine creation Failed. Due to Error : " + err,
        });
    }
}
//create machine//
