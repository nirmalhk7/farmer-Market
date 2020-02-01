var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', { title: 'AgriBazaar' });
});

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'nirmalkhedkar',
	database : 'agribazaar'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

module.exports = router;