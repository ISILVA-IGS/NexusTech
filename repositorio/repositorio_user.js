const mssql = require('../configs/db')
module.exports  = {
    async login(data){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`select * from usuario where email ='${data.email}' or nome_usuario = '${data.email}' and ativado = 1 `,(err,rs)=>{

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
    },

    async insert(data){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            console.log(data.cpf);
            
            sql.query(`insert into usuario values (${data.cpf},'${data.name}','${data.usuario}','${data.email}','${data.password}',
            '${data.celular}','${data.crf}',${data.administrador},${data.notificacao},'${data.fotoValue}',${data.unidade},1);`,(err,rs)=>{

                if(err){
                    console.log(err);
                }else{
             
                    resolve(rs.recordset);
                }

             });
            
        });
    },

    async selectUsers(fkunidade){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`select * from usuario where fk_unidade = ${fkunidade} and ativado = 1`,(err,rs)=>{

                if(err){
                    reject(err);
                }else{
             
                    resolve(rs.recordset);
                }

             });
            
        });
    },

    async selectUser(cpf){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`select * from usuario where cpf = ${cpf}`,(err,rs)=>{

                if(err){
                    reject(err);
                }else{
             
                    resolve(rs.recordset);
                }

             });
            
        });
    },
    

    async updateUser(data){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`update usuario set nome_usuario = '${data.usuario}',email='${data.email}',tel_cel ='${data.celular}',
            senha='${data.password}',foto='${data.fotoUpdate}' where cpf ='${data.idUpdate}'`,(err,rs)=>{

                if(err){
                    reject(err);
                }else{
             
                    resolve(rs.recordset);
                }

             });
            
        });
    },
    async updateUserAdm(data){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`update usuario set nome_completo = '${data.name}',crf='${data.CRF}',administrador =${data.administradorUpdate},
            notificacao=${data.notificacaoUpdate} where cpf ='${data.idUpdateAdm}'`,(err,rs)=>{

                if(err){
                    reject(err);
                }else{
             
                    resolve(rs.recordset);
                }

             });
            
        });
    },
    async delete (cpf){
        const sql = await mssql.connect()
        return new Promise((resolve,reject)=>{
            
            
            sql.query(`update usuario set ativado = 0 where cpf ='${cpf}'`,(err,rs)=>{

                if(err){
                    reject(err);
                }else{
             
                    resolve(rs.recordset);
                }

             });
            
        });
    }

}