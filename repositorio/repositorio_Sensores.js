const mssql = require('../configs/db')
module.exports  = {
    async selectSensores(unidade){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`select * from  sensores where fk_unidade = ${unidade}`,(err,rs)=>{

                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rs.recordset);
                }

             });
            
        });
        

    }
}