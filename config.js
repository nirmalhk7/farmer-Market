

var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'nirmalkhedkar',
	database : 'agribazaar'
});
connection.connect(function (err){
	if(!err){
		console.log("MySQL: Database is CONNECTED :) ")
	}else {
		console.log("MySQL: Database is DISCONNECTED :( ")
	}
});

module.exports=connection;
