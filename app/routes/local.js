var config = require('../../config/db')
var sql = require('mssql')
module.exports = function(application){
	users = application.get('users');
	application.get('/', function(req, res){
		res.render('login', {r : {}, l : {}});
		console.log(config);
		
	});
	application.post('/login', function(req, res){
		var login = req.body;
		var auth = false;
		for(user of users){
            if (user.username == login.username && user.password == login.pass) {
				auth = true;
			}          
		}
		auth ? res.send('Login Correto!') : res.redirect('/');
	});
	application.post('/register', function(req, res){
		var register = req.body;
		users.push(register);		
		res.render('login', {r : register});
	});
}