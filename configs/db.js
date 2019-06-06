const sql = require('mssql')
const config = {
    user: 'isilva',
    password: '#Gf47633297824',
    
    server: 'servernexustech.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'NexueTech',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }

}
module.exports={
    connect(){
        return new Promise((resolve,reject)=>{

            sql.close();
            sql.connect(config, err => {
             
                var request = new sql.Request()
            
                if(err){
                    console.log(err);
                    
                }else{
                    resolve(request);

                }
                
             
                
            });
        });
        
    }
}


