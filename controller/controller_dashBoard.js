const repositorio_Monitoramento = require('../repositorio/repositorio_Monitoramento');
const rUser = require('../repositorio/repositorio_user');
const date = require("./../utils/date")
class Controller_dashBoard{

  constructor(){
  
  }



 
  
  selectToplast10(id){
    
    return new Promise((resolve,reject)=>{
      repositorio_Monitoramento.selectTodosSensor(id).then(rs=>{
            
        var time =[];
        var temp = [];
        var umid = [];

          for(let i = 0;i < 10;i++){
            console.log(rs);

          temp[i] = rs.recordset[i].Temperatura_Atual;

          umid[i] = rs.recordset[i].Umidade_Atual;
          
            
        }
        
        var json={temp,umid,apelido:rs.recordset[0].apelido,unidade:rs.recordset[0].unidade};
              
        resolve(json)
        
      })
    });
     
  }

  

  selectSensores(cpf){
    return new Promise((resolve,reject)=>{
      rUser.selectSensores(cpf).then(rs=>{resolve(rs)})



    });
  }



}


    


module.exports=Controller_dashBoard;