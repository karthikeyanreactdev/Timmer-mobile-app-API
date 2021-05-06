var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: 'machineapp'
  
  });
  
module.exports = con;

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });