class eventsVericacao{

    constructor(){
        this.eventsT={y0:"",y1:"",r0:"",r1:"",g0:"",g1:""};
        this.eventsU={y0:"",y1:"",r0:"",r1:"",g0:"",g1:""};
        this.idSelectorText={temp:"",umid:""};
        this.idSelectorText.temp=document.querySelector("#textTemp");
        this.idSelectorText.umid=document.querySelector("#textUmid");
        this.idSelector={temp:"",umid:""};
        this.idSelector.temp=document.querySelector('#imgTemp');
        this.idSelector.umid=document.querySelector('#imgUmid');
        this.idSrc={y:"/admin/dist/img/c_yellow.jpg",r:"/admin/dist/img/c_red.png",g:"/admin/dist/img/c_green.jpg"};
        
    }

    alterarText(tipo){

        switch(tipo){
            case"tg":
               this.idSelectorText.temp.innerHTML="Sit. Normal";
            break;

            case"ty":
                this.idSelectorText.temp.innerHTML="Sit. Atenção";
            break;
            
            case"tr":
                this.idSelectorText.temp.innerHTML="Sit. Emergência";
            break;

            case"ug":

               this.idSelectorText.umid.innerHTML="Sit. Normal";
                
            break;
            case"uy":

                this.idSelectorText.umid.innerHTML="Sit. Atenção";

            break;
            case"ur":

                this.idSelectorText.umid.innerHTML=" Sit.Emergência";

            break;

        }


    }

    startGreen(tipo){
        var instancia = this;

        if(tipo=='t'){
            this.eventsT.g1 = setInterval(function(){instancia.idSelector.temp.src=instancia.idSrc.g;}, 700);
            this.eventsT.g0 = setInterval(function(){instancia.idSelector.temp.src=""; }, 1400);
            this.alterarText(tipo+"g");
        }
        else{
            this.eventsU.g1 = setInterval(function(){instancia.idSelector.umid.src=instancia.idSrc.g;}, 700);
            this.eventsU.g0 = setInterval(function(){instancia.idSelector.umid.src=""; }, 1400);
            this.alterarText(tipo+"g");
        }
    }

    startYellow(tipo){
        var instancia = this;

        if(tipo=='t'){
            this.eventsT.y1 = setInterval(function(){instancia.idSelector.temp.src=instancia.idSrc.y;}, 700);
            this.eventsT.y0 = setInterval(function(){instancia.idSelector.temp.src=""; }, 1400);
            this.alterarText(tipo+"y");
        }
        else{
            this.eventsU.y1 = setInterval(function(){instancia.idSelector.umid.src=instancia.idSrc.y;}, 700);
            this.eventsU.y0 = setInterval(function(){instancia.idSelector.umid.src=""; }, 1400);
            this.alterarText(tipo+"y");
        }
    }

    startRed(tipo){
        var instancia = this;

        if(tipo=='t'){
            this.eventsT.r1 = setInterval(function(){instancia.idSelector.temp.src=instancia.idSrc.r;}, 700);
            this.eventsT.r0 = setInterval(function(){instancia.idSelector.temp.src=""; }, 1400);
            this.alterarText(tipo+"r");
        }
        else{
            this.eventsU.r1 = setInterval(function(){instancia.idSelector.umid.src=instancia.idSrc.r;}, 700);
            this.eventsU.r0 = setInterval(function(){instancia.idSelector.umid.src=""; }, 1400);
            this.alterarText(tipo+"r");
        }
    }

    stop(tipo){

        switch(tipo){
            case"tg":
                clearInterval(this.eventsT.g0);
                clearInterval(this.eventsT.g1);
                this.idSelector.temp.src=this.idSrc.g;
            break;
            case"ty":
                clearInterval(this.eventsT.y0);
                clearInterval(this.eventsT.y1);
                this.idSelector.temp.src=this.idSrc.y;

            
            break;
            case"tr":
                clearInterval(this.eventsT.r0);
                clearInterval(this.eventsT.r1);
                this.idSelector.temp.src=this.idSrc.r;

            break;

            case"ug":
                clearInterval(this.eventsU.g0);
                clearInterval(this.eventsU.g1);
                this.idSelector.umid.src=this.idSrc.g;

            break;
            case"uy":
                clearInterval(this.eventsU.y0);
                clearInterval(this.eventsU.y1);
                this.idSelector.umid.src=this.idSrc.y;

            
            break;
            case"ur":

                clearInterval(this.eventsU.r0);
                clearInterval(this.eventsU.r1);
                this.idSelector.umid.src=this.idSrc.r;

            break;

        }
   
    }





}