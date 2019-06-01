const repositorio_Historico = require('../repositorio/repositorio_Historico')
var toFixed = require('tofixed');
module.exports= {

  select(dataInit,dataEnd,sensor){
    return new Promise((resolve,reject)=>{
        
        if(!dataInit){
            dataInit='2019-05-01'
            dataEnd='2019-05-30'
            sensor ='2'
        }
        repositorio_Historico.select(dataInit,dataEnd,sensor).then(rs=>{
           
            resolve(rs);
        })

    });
  }
}

