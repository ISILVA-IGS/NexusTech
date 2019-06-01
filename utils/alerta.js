const Nexmo = require('nexmo');

module.exports= function(msg){

    console.log(msg);


    const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '287a58e6',
  apiSecret: 'Vz6hFiIDe9RUo1co'
})

const from = 'Nexmo'
const to = '5511967134307'
const text = msg

nexmo.message.sendSms(from, to, text)
    
    
    
         

}



