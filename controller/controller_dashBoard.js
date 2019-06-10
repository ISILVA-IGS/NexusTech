const repositorio_Monitoramento = require('../repositorio/repositorio_Monitoramento');
const rUser = require('../repositorio/repositorio_user');
const date = require("./../utils/date")
class Controller_dashBoard {

    constructor() {

    }





    selectToplast10(id) {

        return new Promise((resolve, reject) => {
            repositorio_Monitoramento.selectTodosSensor(id).then(rs => {

                var time = [];
                var temp = [];
                var umid = [];

                for (let i = 0; i < 10; i++) {

                    temp[i] = parseFloat(rs.recordset[i].Temperatura_Atual.toFixed(2));

                    umid[i] = parseFloat(rs.recordset[i].Umidade_Atual.toFixed(2));


                }





                var json = { temp, umid, apelido: rs.recordset[0].apelido, unidade: rs.recordset[0].unidade };

                resolve(json)
            })



        });

    }



    selectSensores(cpf) {
        return new Promise((resolve, reject) => {
            rUser.selectSensores(cpf).then(rs => { resolve(rs) })



        });
    }

    filtroAlerta(id) {
        return new Promise((resolve, reject) => {
            repositorio_Monitoramento.selectAlerta(id).then(alerta => {

                var json = { te: { min: '', max: '' }, ta: { min: '', max: '' }, tr: { min: '', max: '' }, ue: { min: '', max: '' }, ua: { min: '', max: '' }, ur: { min: '', max: '' } }
                alerta.forEach((rs) => {
                    if (rs.Tipo_Unidade == "T") {
                        if (rs.Tipo_Alerta == 'R') {
                            json.tr.min = rs.min;
                            json.tr.max = rs.max;

                        }
                        else if (rs.Tipo_Alerta == 'A') {
                            json.ta.min = rs.min;
                            json.ta.max = rs.max;
                        }
                        else if (rs.Tipo_Alerta == 'E') {
                            json.te.min = rs.min;
                            json.te.max = rs.max;
                        }

                    } else {
                        if (rs.Tipo_Alerta == 'R') {
                            json.ur.min = rs.min;
                            json.ur.max = rs.max;
                        }
                        else if (rs.Tipo_Alerta == 'A') {
                            json.ua.min = rs.min;
                            json.ua.max = rs.max;
                        }
                        else if (rs.Tipo_Alerta == 'E') {
                            json.ue.min = rs.min;
                            json.ue.max = rs.max;

                        }
                    }
                });
                global.alertas = json;
                global.idSensor = id;
                resolve(json);



            });


        });
    }

    analytics(id){
        return new Promise((resolve,reject)=>{
            var data = new Date();
            data = `${date.getY(data)}-${date.getM(data)+1}-${date.getD(data)}`;

            repositorio_Monitoramento.selectAnalytcs(id,data).then(rs=>{

                if(!rs){
                    rs = {minimo:0,mediana:0,primeiroQuartil:0,terceiroQuartil:0,maximo:0}
                }
                resolve(rs)
                
            });
        });
    }



}





module.exports = Controller_dashBoard;