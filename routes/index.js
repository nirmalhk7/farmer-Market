var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var username=req.session.username;
    var userId=req.session.userId;
    console.log("express-session: "+username+" is found from the Cache")
    if(req.session.role!="farmer")
        res.render('index',{title:"India's Biggest Farmer-to-Consumer Marketplace",accname: username});
    else
        res.redirect('/dashboard')
});
module.exports = router;