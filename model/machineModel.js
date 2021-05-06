const mysqlConnection = require("../dbconfig");

// This function creates project entry in DB
exports.create = async () => {
    // const projectCreate = await pool.query(
    //     "INSERT INTO projects (projectname,startdate,status) VALUES($1,$2,$3) RETURNING *",
    //     [data.projectname, data.startdate, data.status]
    // );
    // return projectCreate.rows;


  const val= await  mysqlConnection.query('SELECT * FROM machines', (err, result) => {
        if (!err){
       // console.log(result)
      //  console.log(JSON.stringify(result))
        return result;    // 
        }
        else{
        console.log(err);
        }
        })

       // console.log(data1)

};

