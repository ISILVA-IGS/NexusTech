

HTMLFormElement.prototype.save = function(btn){
    
    return new Promise((resolve,reject)=>{


        let form = this;
        form.addEventListener('submit',(evet)=>{
            btn.classList.add("disabled");
            event.preventDefault();

            var campos = form.querySelectorAll('[name]');
            var i = 0;
            var erro = false;
            [...campos].forEach((campo)=>{
                if( campos[i].value == "" && !erro && campos[i].file=='' ){
                    alert('Por favor Preencha todos campos');
                    erro= true;
                    console.log(campo);
                    btn.classList.remove("disabled");
                }   
                i++;
            
            });
            
           
            if(!erro){
                let formData = new FormData(form);


                fetch(form.action,{method:form.method,body:formData}).then(Response=>{resolve(Response)})
                .catch(err=>{reject(err)});
            }
            
            
          
        });


    });

}