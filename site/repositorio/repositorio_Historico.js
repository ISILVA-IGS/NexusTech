const mssql = require('../configs/db');


module.exports={
    async selectDadosBas() {
        console.log("jajajajaja");
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`select Data_mon, fk_Sensor from monitoramento where idAtual > (select count(idAtual) from monitoramento)`,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                }
    
    
            });
        });

        

    },
    async selectAnalyticsT(i) {

        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`select min(Temperatura_Atual) as 'TempMin',
            max(Temperatura_Atual) as 'TempMax',
            avg(Temperatura_Atual) as 'TempMed'
            from monitoramento where fk_Sensor = 1`,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                }
    
    
            });
        });

        

    },

    async selectAnalyticsU(i) {

        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            sql.query(`select min(Umidade_Atual) as 'UmiMin',
            max(Umidade_Atual) as 'UmiMax',
            avg(Umidade_Atual) as 'UmiMed'
            from monitoramento where fk_Sensor = 1`,(err,result)=>{
                
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                }
    
    
            });
        });

        

    }
}