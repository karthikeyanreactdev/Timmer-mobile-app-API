
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

    //crud operation//    
    app.get("/getallmachines",machineController.getAllMachine);
    app.get("/getMachineById/:machineid",machineController.getMachineById);
    app.put("/updateMachine",machineController.updateMachine);
    app.delete("/deleteMachine/:machineid",machineController.deleteMachine);
    app.post("/createMachine",machineController.createMachine);    
    //crud operation//

  };
  


