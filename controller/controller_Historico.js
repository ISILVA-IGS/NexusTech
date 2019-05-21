const repositorio_Historico = require('../repositorio/repositorio_Historico')
class Controller_Historico{

    selectDadosBas(){
        var time =[];
        var datas =[];
        var sensor =[];

        time[i]=date.getTime(rs.recordset[i].Data_mon+"GMT-6:00");
        datas[i]=date.getY(rs.recordset[i].Data_mon),getM(rs.recordset[i].Data_mon),getD(rs.recordset[i].Data_mon);
        sensor[i] = rs.recordset[i].fkSensor;

    }

    selectAnalyticsT(){
        var maxi =[];
        var mini =[];
        var medi =[];

        maxi[i]=rs.recordset[i].Temperatura_Atual;
        mini[i]=rs.recordset[i].Temperatura_Atual;
        medi[i]=rs.recordset[i].Temperatura_Atual;
    }

    selectAnalyticsU(){
        var maxi =[];
        var mini =[];
        var medi =[];

        maxi[i]=rs.recordset[i].Umidade_Atual;
        mini[i]=rs.recordset[i].Umidade_Atual;
        medi[i]=rs.recordset[i].Umidade_Atual;
    }
}

module.exports = Controller_Historico;