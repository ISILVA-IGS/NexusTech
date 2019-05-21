const mssql = require('../configs/db');


module.exports={
    async selectTodosSensor(id) {
        
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`
            select top 10 * from monitoramento inner join sensor on fk_sensor = idsensor where fk_Sensor = ${id} order by idatual desc  `,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    resolve(result);
                }
    
    
            });
        });

        

    },
    async selectUltimoSensor(id) {

        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`select top 1 * from monitoramento where fk_sensor =${id} order by idatual desc
            `,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    resolve(result);
                }
    
    
            });
        });

        

    }
}