var config = require('../../config/db')
var sql = require('mssql')

module.exports = function(application){
	users = application.get('users');
	
	application.get('/', function(req, res){

		sql.connect(config).then(() => {
			return sql.query`Select * from Clientes`
		}).then(result => {
			//console.log(result);
			res.render('login', {r : {}, l : {}, c : result.recordset});	
			sql.close()
		}).catch(err => {
			console.log(err);
			sql.close()
			res.send('Falha ao estabelecer conexão com o banco', err);	
		});
			
	});

	application.post('/login', function(req, res){
		var login = req.body;
		console.log(login);
		
		var auth = false;
		// for(user of users){
        //     if (user.username == login.username && user.password == login.pass) {
		// 		auth = true;
		// 	}          
		// }
		// auth ? res.send('Login Correto!') : res.redirect('/');

		sql.connect(config).then(() => {
			return sql.query`Select * from Usuarios`
		}).then(result => {
			for(user of result.recordset){
				console.log(user.Nome, user.Senha);
				
			    if (user.Nome == login.username && user.Senha == login.pass) {
					console.log("Chegui");
					
					auth = true;
				}	
			}
			auth ? res.send('Login Correto!') : res.redirect('/');
			sql.close()
		}).catch(err => {
			console.log(err);
			sql.close()
			res.send('Falha ao estabelecer conexão com o banco');	
		});
	});
	application.post('/register', function(req, res){
		var register = req.body;

		sql.connect(config, err => {
			// ... error checks
		 
			const request = new sql.Request()
			request.stream = true // You can set streaming differently for each request
			request.query(`INSERT INTO Usuarios VALUES ('${register.name}', '${register.email}','${register.password}', ${register.fkIDclientes})`) // or request.execute(procedure)
		 
			request.on('error', err => {
				res.send(err)
			})
			request.on('done', result => {
				console.log(result);
				res.redirect('/');
				sql.close();
			})
			
		})
	});
	application.get('/postlogin', function(req, res){
		res.render("postlogin")
	});
}