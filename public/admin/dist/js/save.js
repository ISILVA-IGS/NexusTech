

HTMLFormElement.prototype.save = function(btn){
    
    return new Promise((resolve,reject)=>{


        let form = this;
        form.addEventListener('submit',(evet)=>{
            btn.classList.add("disabled");
            event.preventDefault();

            var campos = form.querySelectorAll('[name]');
            
            var erro = false;
            [...campos].forEach((campo)=>{

               
                if( campo.value == "" && !erro ){
        
                    if( !campo.file==""){
                    
                    }else{
                        console.log(campo.file);
                        alert('Por favor Preencha todos campos');
                        erro= true;
                    
                        btn.classList.remove("disabled");
                    }
                   
                }   
                
            
            });
            console.dir(campos)
            
           
            if(!erro){
                let formData = new FormData(form);


                fetch(form.action,{method:form.method,body:formData}).then(Response=>{resolve(Response)})
                .catch(err=>{reject(err)});
            }
            
            
          
        });


    });

}