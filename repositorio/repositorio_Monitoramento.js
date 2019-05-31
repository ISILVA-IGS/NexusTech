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

        

    },
    async selectAlerta(id) {

        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`select a.* from alerta as a inner join sensor on fk_sensor = idsensor  where idsensor = ${id}`
             ,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    resolve(result.recordset);
                }
    
    
            });
        });

        

    },

    async selectAnalytcs(id,date) {
        
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`SELECT DISTINCT 

            MIN(CAST([Temperatura_Atual] AS FLOAT)) 
            OVER(PARTITION BY 1) AS [minimo],
            PERCENTILE_CONT(0.25) WITHIN GROUP(ORDER BY CAST([Temperatura_Atual] AS FLOAT)) OVER(PARTITION BY 1) AS [primeiroQuartil],
            PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY CAST([Temperatura_Atual] AS FLOAT)) OVER(PARTITION BY 1) AS [mediana],
            PERCENTILE_CONT(0.75) WITHIN GROUP(ORDER BY CAST([Temperatura_Atual] AS FLOAT)) OVER(PARTITION BY 1) AS [terceiroQuartil],
            MAX(CAST([Temperatura_Atual] AS FLOAT)) OVER(PARTITION BY 1) AS [maximo] FROM Monitoramento WHERE fk_Sensor = ${id} and data_mon >=${date}`
             ,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    resolve(result.recordset[0]);
                }
    
    
            });
        });

        

    }



}