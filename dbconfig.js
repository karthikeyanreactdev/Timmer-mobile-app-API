var mysql = require('mysql');


var con = mysql.createConnection({
    host: "sql6.freemysqlhosting.net",
    user: "sql6410969",
    password: "ZKzTgRv1Hj",
    database: 'sql6410969'
  
  });
  
module.exports = con;

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });
