

HTMLFormElement.prototype.save = function(){
    
    return new Promise((resolve,reject)=>{

        let form = this;
        form.addEventListener('submit',(evet)=>{

            event.preventDefault();

            var campos = form.querySelectorAll('[name]');
              
            if(campos[0].name=="title" && campos[0].value == ""){
                alert('Por favor digite o Titulo do Menu');
            }
            else if(campos[1].name=="description" && campos[1].value == ""){
                alert('Por favor digite a Descrição do Menu');
            }
            else if(campos[2].name=="price" && campos[2].value == ""){
                alert('Por favor digite o Preço do Menu');
            }
            else if(campos[3].name=="photo" && campos[3].value == ""){
                alert('Por favor adicione uma foto ao menu do hh Menu');

            }
            else{
                let formData = new FormData(form);


                fetch(form.action,{method:form.method,body:formData}).then(Response=> Response.json())
                .then(json=>{
                    resolve(json);
                }).catch(err=>{reject(err)});
            }
            
            
          
        });


    });

}