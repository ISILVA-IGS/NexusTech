const repositorio_Historico = require('../repositorio/repositorio_Historico')

module.exports= {

  select(dataInit,dataEnd,sensor){
    return new Promise((resolve,reject)=>{
        
        if(!dataInit){
            dataInit='2019-05-01'
            dataEnd='2019-05-30'
            sensor ='2'
        }
        repositorio_Historico.select(dataInit,dataEnd,sensor).then(rs=>{
            rs = this.tratarDados(rs);
            resolve(rs);
        })

    });
  },
  tratarDados(rs){
    rs.forEach(element => {
      var dado = element.tempMedia
      element = parseFloat(dado.toFixed(2));
    });
  }
}

  