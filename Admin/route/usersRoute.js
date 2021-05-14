
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

    //crud operation//
    app.post("/creatuser",usersController.createUser);
    app.get("/getAlluser",usersController.getAllUsers);
    app.put("/updateuser",usersController.updateUser);
    app.get("/getuser/:userid",usersController.getUserById);
    app.delete("/deleteuser/:userid",usersController.deleteUser);
    //crud operation//

  };
  


