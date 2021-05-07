const fast2sms = require('fast-two-sms')
const con = require('./dbconfig');


module.exports.sendSMS = function  (otp, number){
console.log("OTP :"+otp)
console.log("Number :"+number)
 var options = {authorization : 'apikey' , message : ''+otp ,  numbers : [number]} 
 const msg=fast2sms.sendMessage(options)
 console.log(msg)

}

