const sql = require("../repositorio/repositorio_user");
module.exports={

    validar(req){
        req.assert('email','Digite o seu E-mail').notEmpty();
        req.assert('password','Digite a sua senha').notEmpty();

        var erro = req.validationErrors();
        if(erro){
            
            return erro;
        }else{
            return null;
        }
        
    },

    autenticar(req){
        
        return new Promise((resolve,reject)=>{

            

            sql.login(req.body).then((rs)=>{
                if(rs.length > 0){
                    let row = rs[0];
                    if(row.Senha == req.body.password){
                        resolve(row);
                    }else{
                        reject({msg :'usuario ou senha errada'})
                    }
                }else{
                    reject({msg:'usuario ou senha errada'})
                    
                }
            }).catch((err)=>{
                reject({msg:err});
                
            })
        });
    }



}