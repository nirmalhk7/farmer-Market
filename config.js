

var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'nirmalkhedkar',
	database : 'agribazaar',
	multipleStatements : true
});
connection.connect(function (err){
	if(!err){
		console.log("MySQL","Database is CONNECTED :) ")
	}else {
		throw console.error("MySQL","Database is DISCONNECTED :( ");
	}
});
module.exports=connection;
