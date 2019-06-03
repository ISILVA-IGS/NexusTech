const repositorio_Historico = require('../repositorio/repositorio_Historico')

module.exports= {

  select(dataInit,dataEnd,sensor){
    return new Promise(  (resolve,reject)=>{
        
        if(!dataInit){
            dataInit='2019-05-01'
            dataEnd='2019-05-30'
            sensor ='2'
        }
        repositorio_Historico.select(dataInit,dataEnd,sensor).then( async rs=>{
            rs = await this.tratarDados(rs);
            resolve(rs);
        })

    });
  },
  tratarDados(rs){
    rs.forEach(element => {
      var dado="";
      var dado2="";
    
      if(typeof element.tempMedia == 'object'){
         dado = element.tempMedia[0]
      }else{
        dado = element.tempMedia;
      }

      if(typeof element.umidMedia == 'object'){
        dado2 = element.umidMedia[0]
     }else{
       dado2 = element.umidMedia;
     }

     var data = new Date(element.data );
      data = (data.getDate())+'/'+(data.getMonth()+1)+'/'+data.getFullYear()

      element.data = data;
      element.tempMedia = parseFloat(dado.toFixed(2));
      element.umidMedia = parseFloat(dado2.toFixed(2));



    });

    
    
    return rs;
  }
}

  