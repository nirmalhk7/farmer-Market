

var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'agribazaar'
});
connection.connect(function (err){
	if(!err){
		console.log("Database is CONNECTED :) ")
	}else {
		console.log("Database is DISCONNECTED :( ")
	}
});
module.exports=connection;