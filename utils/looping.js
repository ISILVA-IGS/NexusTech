const date = require("./date");
const repositorio_Monitoramento = require('../repositorio/repositorio_Monitoramento');
const alerta_ = require("../controller/controllerAlerta");


class controllerLopping{

    constructor(){

        this.alertaTemp = new alerta_('t');
        this.alertaUmid = new alerta_('u');

    }

    resetaInstancia(){
        this.alertaTemp = new alerta_('t');
        this.alertaUmid = new alerta_('u');
    }

    start(id){
        return new Promise((resolve,reject)=>{
            repositorio_Monitoramento.selectUltimoSensor(id).then(rs => {


                let time = date.getTime(rs.recordset[0].Data_mon + 'GMT-6:00')
    
                let temp = rs.recordset[0].Temperatura_Atual;
    
                let umid = rs.recordset[0].Umidade_Atual;
    
    
                this.alertaTemp.comparar(temp, 3.5, 6.5, 2.5, 7.5);
                this.alertaUmid.comparar(umid, 50, 60, 45, 65);
    
                var json={time,temp,umid};
                resolve(json);
    
    
            })

        });



    }



}




module.exports = controllerLopping;



















