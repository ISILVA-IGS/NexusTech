class Delete{


    constructor(id,url){

        this.id = id;
        this.url = url
        this.name = name

    }

    init(){
      return new Promise((resolve,reject)=>{

        var url = this.url;

        let btns = document.querySelectorAll(this.id);
        [...btns].forEach(function(btn){
      
          btn.addEventListener('click',(e)=>{
         
      
           var tr = e.path.find(el =>{
              if(el.tagName === 'TR'){
                return el;
              }
            })
      
            
            var row = JSON.parse(tr.dataset.row);
      
            
            

            if(confirm(`tem Certeza que deseja apagar o usuario ${row.Nome_usuario} ?`)){
      
              

                fetch(url+row.CPF,{method:'DELETE'}).then(Response=>{resolve(Response)}).catch(err=>{reject(err)});
              
              
              
            }
          });
      
        
        });


      });  





    }
}