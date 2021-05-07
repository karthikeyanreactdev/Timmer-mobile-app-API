const fast2sms = require('fast-two-sms')
const con = require('./dbconfig');


module.exports.sendSMS = function  (otp, number){
console.log("OTP :"+otp)
console.log("Number :"+number)
//  var options = {authorization : 'lp42wAUNCp674roaj9mMnHFcuTSW3sejGO1JqrTCTLMJAbaKhIpvuMETPzHl' , message : ''+otp ,  numbers : [number]} 
//  const msg=fast2sms.sendMessage(options)
 //console.log(msg)

}

