var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var app= express();
var session = require('express-session');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);	
app.post('/users', user.login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'nirmalkhedkar',
	database : 'agribazaar'
});
connection.connect();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.post('/auth', function(request, response) {
	var username = request.body.username;
    var password = request.body.password;
    console.log("AUTHENTICATION")
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

module.exports = app;