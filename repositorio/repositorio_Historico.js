const mssql = require('../configs/db');


module.exports={
   

    async select(dateInit,dateEnd,sensor) {
        console.log(dateInit,dateEnd,sensor);
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`select min(Temperatura_Atual) as tempMin ,
            max(Temperatura_Atual) as tempMax,
            avg(Temperatura_Atual)as tempMedia,min(umidade_atual) as tempMedia,
            min(umidade_Atual) as umidMin ,
            max(umidade_Atual) as umidMax,
            avg(umidade_Atual) as umidMedia,
            data_mon as data
            from Monitoramento where fk_Sensor = ${sensor} and data_mon >= '${dateInit}' and data_mon <= '${dateEnd}' group by Data_mon;
            
            `,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    resolve(result.recordset);
                }
    
    
            });
        });

        

    }
}