
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
   
    const billingController=require('../controller/billingController');
   
    app.post("/startTimeEntry", billingController.startTime);
    app.post("/pauseTimeEntry", billingController.pauseTime);
    app.post("/resumeTimeEntry", billingController.resumeTime);
    app.post("/stopTimeEntry", billingController.stopTime);

    app.get("/billdata/:id/:start", billingController.getuserBilldata);
    app.get("/getuserBilldatabyunique/:id", billingController.getuserBilldatabyunique);
    app.get("/userBilldatabyid/:id", billingController.getuserBilldatabyid);

    app.get("/getmachineBilldata/:id/:start", billingController.getmachineBilldata);
    app.get("/getmachineBilldatabyid/:id", billingController.getmachineBilldatabyid);
    

   
    app.post("/VerifyOTPforTimer", billingController.VerifyOTPforTimer);
    app.get("/sendOTPforTimer/:mobile/:usermobile", billingController.sendOTPforTimer);

    


  };
  


