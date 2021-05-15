
//
module.exports = app => {

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        )
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,authorization");
        if (req.method === 'OPTIONS') {
            res.header(
                "Access-Control-Allow-Methods",
                "GET, POST, OPTIONS, PUT, PATCH, DELETE"
            )
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,authorization");
            return res.status(200).json({});

        }
        next();
    });
   
    const machineController=require('../controller/machineController');
   
    app.get("/getallactivemachines", machineController.getAllActiveMachines);
    app.post("/loginasmachine", machineController.LoginasMachine);
    app.post("/VerifyOTPforMachine", machineController.VerifyOTPforMachine);
    app.get("/ResendOTPforMachine/:mobile", machineController.ResendOTPforMachine);

    app.get("/getActiveMachine/:id", machineController.getActiveMachine);
     app.get("/getActiveUser/:id", machineController.getActiveUser);
    app.get("/getallmachine", machineController.getallmachine);

    app.get("/getAllActiveMachinesbaseduser/:id",machineController.getAllActiveMachinesbaseduser);
    app.get("/getAllbusyeMachinesbaseduser/:id",machineController.getAllbusyeMachinesbaseduser);



  };
  


