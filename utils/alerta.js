const Nexmo = require('nexmo');

module.exports= function(msg){

    console.log(msg);


    const nexmo = new Nexmo({
      apiKey: '287a58e6',
      apiSecret: 'Vz6hFiIDe9RUo1co',
    });
    
    const message = {
      content: {
        type: 'text',
        text: msg,
      },
    };
    
    nexmo.channel.send(
      { type: 'sms', number: '5511969737426' },
      { type: 'sms', number: 'Nexmo' },
      message,
      (err, data) => { console.log(data.message_uuid); },
      { useBasicAuth: true },
    );
    
    
    
         

}



