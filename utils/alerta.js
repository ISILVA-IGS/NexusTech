const Nexmo = require('nexmo');

module.exports= function(msg,number){

    console.log(msg);

    const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
      apiKey: '553285e4',
      apiSecret: '9nOaFUbsmL2pbfX8'
    })
    
    const from = 'NexusTech'
    const to = number
    const text = msg
    
    nexmo.message.sendSms(from, to, text)
    
    
    
         

}



