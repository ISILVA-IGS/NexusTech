var express = require('express');
var router = express.Router();
var C_dashBoard_ = require('../controller/controller_dashBoard');
var C_dashBoard = new C_dashBoard_();
const C_user = require("../controller/Controller_User");
var repositorio_Historico = require('../repositorio/repositorio_Historico');
const login = require("../controller/controller_login");
const looping_ = require("../utils/looping");
const looping = new looping_()
const c_historico = require('../controller/controller_Historico');


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
  C_dashBoard.selectSensores(req.session.user.idUsuario).then(sensores=>{
    var id;
    if(req.query.id){
      id=  req.query.id
    }else{
      
      id= sensores[0].idSensor
    }
    req.session.sensores = sensores;
    global.sensores = sensores;
    looping.resetaInstancia();
    res.render('monitoramento',{sensores,user:req.session.user,id:id})

  });
});




router.get('/user', function(req, res, next) {
  C_user.select(req.session.user).then(json =>{
  res.render('user',{sensores:req.session.sensores,user:req.session.user,users:json});
  })
  
 
});

router.post('/user', function(req, res, next) {
  C_user.saveOrUpdate(req.fields).then(rs=>{ res.send(rs); }).catch(err=>{res.send(err)});
  
 
});

router.delete('/user/:id', function(req, res, next) {
 
  C_user.delete(req.params.id).then(rs=>{ res.send(rs); });
 
});


router.get('/historico', function(req, res, next) {
 
  
 

  c_historico.select(req.query.dateStart,req.query.dateEnd,req.query.sensor).then(rs=>{
    res.render('historico',{sensores:req.session.sensores,user:req.session.user,results:rs});
     
   })
 
});













router.post('/looping/', function(req, res, next) {
  
  looping.start(req.query.id).then(json=>{res.send(json)})
 
});

router.post('/start/', async function  (req, res, next) {
  var json = {selects:"",alertas:"",analytics:""}
  json.selects = await C_dashBoard.selectToplast10(req.query.id);
  json.alertas = await C_dashBoard.filtroAlerta(req.query.id);
  json.analytics = await C_dashBoard.analytics(req.query.id);
  

  res.send(json)
});






module.exports = router;
