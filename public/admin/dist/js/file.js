class File {

    constructor(input,img){
       
        this.input = input;
        this.img = img;
        
    }

    ler() {
        return new Promise((resolve,reject)=>{
            document.querySelector(this.input).addEventListener('change',(e)=>{
                let file = new FileReader();
                file.readAsDataURL(e.target.files[0]);
                var image = this.img;
            
                file.onload=function(){
                
                    document.querySelector(image).src = file.result;
                    resolve(file.result);
                }
            
            });
        });
        
    
    }
  
}
