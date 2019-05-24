const r_User = require("../repositorio/repositorio_user");
module.exports={

    saveOrUpdate(data){
        return new Promise((resolve,reject)=>{
            if(data.idUpdate){
                r_User.updateUser(data).then(rs=>{resolve(rs)});

            } else if(data.idUpdateAdm){
                r_User.updateUserAdm(data).then(rs=>{resolve(rs)});
            }
            else {
                r_User.insert(data).then(rs=>{resolve(rs)});

            }
        });
        



    },

    select(user){

        return new Promise((resolve,reject)=>{
            if(user.Administrador){
                
                r_User.selectUsers(user.fk_unidade).then(rs=>{resolve(rs)});


            }else{
                r_User.selectUser(user.CPF).then(rs=>{
                    resolve(rs);

                })
            }
        });
        

    },
    delete(cpf){
        return new Promise((resolve,reject)=>{
            r_User.delete(cpf).then(rs=>{
                resolve(rs);
            })
        });
    }


}