const r_User = require("../repositorio/repositorio_user");
module.exports={

    saveOrUpdate(data){
        return new Promise((resolve,reject)=>{
            if(data.id){
                //update

            }else{
                r_User.insert(data).then(rs=>{resolve(rs)});

            }
        });
        



    }


}