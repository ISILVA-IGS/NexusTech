const mssql = require('../configs/db')
module.exports  = {
    async login(data){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`select * from usuario where email ='${data.email}' or nome_usuario = '${data.email}' `,(err,rs)=>{

                if(err){
                    console.log(err);
                    reject(err);
                }else{
                   // console.log(rs.recordset)
                    resolve(rs.recordset);
                }

             });
            
        });
        

    },

    async selectSensores(cpf){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`select  a.*  from sensor_usuario inner join usuario 
            on cpf = fk_cpf inner join sensor as a on fk_sensor = idsensor where cpf = ${cpf}`,(err,rs)=>{

                if(err){
                    reject(err);
                }else{
             
                    resolve(rs.recordset);
                }

             });
            
        });
    }
}