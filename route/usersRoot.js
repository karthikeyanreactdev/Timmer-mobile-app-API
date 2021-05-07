
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
   
    const usersController=require('../controller/usersController');
   
    app.post("/signup", usersController.signUp);
    app.post("/loginasuser", usersController.Loginasuser);
    app.post("/verifyOTP", usersController.VerifyOTP);
    app.get("/resendOTP/:mobile", usersController.ResendOTP);
    app.get("/getallactiveusers", usersController.getAllActiveUser);
    app.get("/getalluser", usersController.getalluser);



  };
  


