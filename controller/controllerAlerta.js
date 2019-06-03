const sms = require("../utils/alerta");
const date = require('../utils/date');
const user = require('../repositorio/repositorio_user')

class ControllerAlerta{
    constructor(t){

        this.tipo = t;
        this.chamar={y:true,r:true,g:false};
        this.pisca={g:'pisca_green',y:'pisca_yellow',r:'pisca_red'}
        
        
    }

    definirChamada(y,r,g){
        
        y!=null?this.chamar.y=y:''
        r!=null?this.chamar.r=r:''
        g!=null?this.chamar.g=g:''

    }

    comparar(valor,v1,v2,v3,v4){

        console.log(valor,v1,v2,v3,v4); 


        if(valor >= v1 && valor <= v2){
            
            this.definirChamada(true,true,null)

            if(this.chamar.g){
                this.definirChamada(null,null,false);
                this.disparar('pisca_green');
                var instancia = this; 
                setTimeout(function(){

                    instancia.disparar('stop',instancia.tipo+"g");
                    instancia.enviarSms(valor,instancia.tipo+'g');
                    

        
                },5000)
            }

        }
        else if(valor >= v3 && valor <= v4){

            if(this.chamar.y){
                this.disparar('pisca_yellow');
                this.definirChamada(false,true,true);

                var instancia = this;
                setTimeout(function(){
                    
                    instancia.disparar('stop',instancia.tipo+'y');
                    instancia.enviarSms(valor,instancia.tipo+'y');
                    

                    
                },5000)

            }

        }else{

            if(this.chamar.r){
               
                this.disparar('pisca_red');
                this.definirChamada(true,false,true);
                var instancia = this;
                setTimeout(function(){

                    instancia.disparar('stop',instancia.tipo+'r');
                    instancia.enviarSms(valor,instancia.tipo+'r');
                    
                    
                },5000)

            }
            
        }

    }

    disparar(value,tipo){

        switch(value){

            case this.pisca.g:
                global.socket_io.emit(this.pisca.g,this.tipo);
                global.socket_io.emit('stop',this.tipo+"r");
                global.socket_io.emit('stop',this.tipo+"y");
            break;

            case this.pisca.y:
                global.socket_io.emit(this.pisca.y,this.tipo);
                global.socket_io.emit('stop',this.tipo+"r");
                global.socket_io.emit('stop',this.tipo+"g");
            break;

            case this.pisca.r:
                global.socket_io.emit(this.pisca.r,this.tipo);
                global.socket_io.emit('stop',this.tipo+"g");
                global.socket_io.emit('stop',this.tipo+"y");
            break;

            default:
                console.log(value+' '+tipo);
                global.socket_io.emit(value,tipo);
            break;


        }

    }

    enviarSms(valor,tipo){
        var time = new Date().getTime('GMT-6:00');
        var hour = date.getHour(time)
        var msg ="";
        var apelido ='';
        global.sensores.forEach((sensor)=>{
            if(sensor.idSensor == global.idSensor){
                apelido = sensor.apelido
            }
        });
        


        switch(tipo){
            case"tg":
                msg=`NexusTech Informa! ${apelido} esta dentro dos Padroes recomendados, valor registrado as ${hour} e de ${valor} Graus Celsius`
            break;
            case"ty":
                msg=`NexusTech informa! ${apelido} em Situacao de Atencao, Temperatura fora dos Padroes recomendados valor registrado as ${hour} e de ${valor} Graus Celsius`
            break;
            case"tr":
                msg=`NexusTech informa! ${apelido} em Situacao de Emergencia,valor registrado as ${hour} e de ${valor} Graus Celsius`
            break;

            case"ug":
                msg=`NexusTech informa! ${apelido} dentro dos Padroes recomendados, valor registrado as ${hour} e de ${valor}% de Umidade`
            break;
            case"uy":
                msg=`NexusTech informa! ${apelido} em Situacao de Atencao,valor registrado as ${hour} e de ${valor}% de Umidade`
            break;
            case"ur":
                msg=`NexusTech informa! ${apelido} em Situacao de Emergencia,valor registrado as ${hour} e de ${valor}% de Umidade`
            break;

        }

       this.Sms(msg);
    


    }

    Sms(msg){
        user.selectNumerosCelular().then(numeros=>{
            console.log('cheguei');
            numeros.forEach(element => {

                console.log(element.tel_cel)
                sms(msg,element.tel_cel);

            });

        });


    }

}

module.exports=ControllerAlerta;