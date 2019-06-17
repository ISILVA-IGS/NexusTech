const Nexmo = require('nexmo');

module.exports= function(msg,number){

  const Nexmo = require('nexmo');

  const nexmo = new Nexmo({
    apiKey: '71870ee2',
    apiSecret: 'qYemnUIpDN9rI0Lz',
  });
  
  const from = 'Nexmo';
  const to = '5511996083866';
  const text = msg;
  
  nexmo.message.sendSms(from, to, text);
    
    
         

}



