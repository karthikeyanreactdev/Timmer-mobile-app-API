const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const fast2sms = require('fast-two-sms')
const con = require('./dbconfig');


app.use(bodyParser.urlencoded({ limit: "500000mb", extended: true }));
 
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "500000mb", extended: true }));
 
app.use(cors());
app.use(express.json());
// const accountSid = 'ACafd85496f81ccf6746161268fca26613';//process.env.TWILIO_ACCOUNT_SID;
// const authToken ='d8297e7ee998a477b193b9d68a879676';// process.env.TWILIO_AUTH_TOKEN;

// // require the Twilio module and create a REST client
// const client = require('twilio')(accountSid, authToken);
// client.messages
// .create({
//   to: '+917010543395',
//   from: '+18452088305',
//   body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
// })
// .then(message => console.log(message.sid),
// err=>console.log(err));

// var options = {authorization : 'eCxAwroImUpsEt8SdQ1YFJWbMOyqDTHNcjuh2g5609GazlnLRBSOfpu1C9dENBaHbTy2ivGhXgmjIsz8' , message : 'hello' ,  numbers : ['7010543395','9487658591']} 
// fast2sms.sendMessage(options)
//   console.log("Server running on Port : "+port);



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
require('./route/machineRoot')(app);
require('./route/usersRoot')(app);


//admin route
require('./Admin/route/usersRoute')(app);
require('./Admin/route/reportRoute')(app);
require('./Admin/route/machineRoute')(app);
//admin route

const port=5000;
app.listen(5000,()=>{    
console.log('running')
 
})