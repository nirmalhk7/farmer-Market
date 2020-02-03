var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app= express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', { title: 'AgriBazaar' });
});

module.exports = router;