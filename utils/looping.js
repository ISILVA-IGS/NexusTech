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

                let temp = rs.recordset[0].Temperatura_Atual;

                let umid = rs.recordset[0].Umidade_Atual;




                this.alertaTemp.comparar(temp, 3.5, 6.5, 2.5, 7.5);
                this.alertaUmid.comparar(umid, 50, 60, 45, 65);

                var json = { time, temp, umid };
                resolve(json);


            })

        });



    }

    filtroAlerta() {
        return new Promise((resolve, reject) => {
            repositorio_Monitoramento.selectUltimoSensor(id).then(alerta => {
                var json = { te: { min: '', max: '' }, ta: { min: '', max: '' }, tr: { min: '', max: '' }, ue: { min: '', max: '' }, ua: { min: '', max: '' }, ur: { min: '', max: '' } }
                alerta.forEach((rs) => {
                    if (rs.unidade = "t") {
                        if (rs.alerta = 'r') {
                            json.tr.min = rs.min;
                            json.tr.max = rs.max;

                        }
                        else if (rs.alerta = 'a') {
                            json.ta.min = rs.min;
                            json.ta.max = rs.max;
                        }
                        else if (rs.alerta = 'e') {
                            json.te.min = rs.min;
                            json.te.max = rs.max;
                        }

                    } else {
                        if (rs.alerta = 'r') {
                            json.ur.min = rs.min;
                            json.ur.max = rs.max;
                        }
                        else if (rs.alerta = 'a') {
                            json.ar.min = rs.min;
                            json.ar.max = rs.max;
                        }
                        else if (rs.alerta = 'e') {
                            json.er.min = rs.min;
                            json.er.max = rs.max;

                        }
                    }
                });





            });


        });
    }
}








module.exports = controllerLopping;



















