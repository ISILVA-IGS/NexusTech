module.exports={

    getHour(data){
        var date = new Date(data);
        return `${this.format(date.getHours())}:${this.format(date.getMinutes())}:${this.format(date.getSeconds())}`
    },
    format(data){

        if(data <= 9){
            data = `0${data}`
        }
        return data
    },
    getTime(time){
        var date =  new Date(time)
        return date.getTime();

    },
    getY(date){
        var date = new Date(date)
        return date.getFullYear();
    },
    getM(date){
        var date = new Date(date)
        return date.getMonth();
    },
    getD(date){
        var date = new Date(date)
        return date.getDate(); 
    }


}
