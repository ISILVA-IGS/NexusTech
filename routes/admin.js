var express = require('express');
var router = express.Router();
var C_dashBoard_ = require('../controller/controller_dashBoard');
var C_dashBoard = new C_dashBoard_();
const C_user = require("../controller/Controller_User");
var repositorio_Historico = require('../repositorio/repositorio_Historico');
const login = require("../controller/controller_login");
const looping_ = require("../utils/looping");
const looping = new looping_()


router.use(function(req,res,next){
  if(['/login'].indexOf(req.url) === -1 && !req.session.user){

    res.redirect('/admin/login');
  }else{
    next();
  }


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
      res.render('login',{erro});
    });
  }else{
    res.render('login',{erro});
  }

});

router.get('/logout', function(req, res, next) {
  req.session.user = undefined;
  res.redirect('/admin/login')
});





router.get('/login', function(req, res, next) {
  res.render('login')
});



router.get('/monitoramento/', function(req, res, next) {
  console.log(req.session.user);
  C_dashBoard.selectSensores(req.session.user.CPF).then(sensores=>{
    var id;
    if(req.query.id){
      id=  req.query.id
    }else{
      
      id= sensores[0].idSensor
    }
    req.session.sensores = sensores;
    looping.resetaInstancia();
    res.render('monitoramento',{sensores,user:req.session.user,id:id})

  });
});




router.get('/user', function(req, res, next) {
  C_user.select(req.session.user).then(json =>{
    var array =[];
    array[0]=json;
    console.log(array.length);
    res.render('user',{sensores:req.session.sensores,user:req.session.user,users:json});
  })
  
 
});

router.post('/user', function(req, res, next) {
  C_user.saveOrUpdate(req.fields).then(rs=>{ res.send(rs); });
  
 
});











router.post('/looping/', function(req, res, next) {
  
  looping.start(req.query.id).then(json=>{res.send(json)})
 
});

router.post('/start/', function(req, res, next) {
 
  C_dashBoard.selectToplast10(req.query.id).then(json=>{ res.send(json)})
 
});





router.get('/historico', function(req, res, next) {
  
  repositorio_Historico.selectDadosBas();
  //repositorio_Historico.selectAnalyticsT();
  //repositorio_Historico.selectAnalyticsU();
});
module.exports = router;
