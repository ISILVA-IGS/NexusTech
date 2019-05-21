var express = require('express');
var router = express.Router();
const login = require("../controller/controller_login");


/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('admin/login');
});


router.post('/login', function(req, res, next) {

  var erro = false//login.validar(req);

  if(!erro){
    
    login.autenticar(req).then((user)=>{
      
      req.session.user = user;
      res.redirect('/admin/monitoramento');
    }).catch((erros)=>{
      
      erro = [];
      erro.push(erros);
      res.render('admin/login',{erro});
    });
  }else{
    res.render('admin/login',{erro});
  }

});


module.exports = router;
