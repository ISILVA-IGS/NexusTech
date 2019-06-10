const date = require("./date");
const repositorio_Monitoramento = require('../repositorio/repositorio_Monitoramento');
const alerta_ = require("../controller/controllerAlerta");


class controllerLopping {

    constructor() {

        this.alertaTemp = new alerta_('t');
        this.alertaUmid = new alerta_('u');

    }

    resetaInstancia() {
        this.alertaTemp = new alerta_('t');
        this.alertaUmid = new alerta_('u');
    }

    start(id) {
        return new Promise((resolve, reject) => {
            repositorio_Monitoramento.selectUltimoSensor(id).then(rs => {


                let time = date.getTime(rs.recordset[0].Data_mon + 'GMT-6:00')

                let temp =  parseFloat(rs.recordset[0].Temperatura_Atual.toFixed(2))

                let umid = parseFloat(rs.recordset[0].Umidade_Atual.toFixed(2))


                let media = rs.recordset[0].media;
                let mediana = rs.recordset[0].mediana;
                let pquart = rs.recordset[0].pquart;
                let tquart = rs.recordset[0].tquart;
                
                var al = global.alertas

                this.alertaTemp.comparar(temp, al.ta.min, al.ta.max,al.te.min, al.te.max);
                this.alertaUmid.comparar(umid, al.ua.min, al.ua.max,al.ue.min, al.ue.max);

                var json = { time, temp, umid};
                resolve(json);


            })

        });



    }

   
}








module.exports = controllerLopping;



















