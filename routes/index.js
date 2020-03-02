var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("cookie-parser",req.cookies.username+" was logged in!");
    if(req.cookies.username!=null)
    {
        req.session.username=req.cookies.username;
        req.session.userId=req.cookies.userId;
        req.session.role=req.cookies.role;
    }
    var username=req.session.username;
    var userId=req.session.userId;
    console.log("express-session: "+username+" is found from the Cache")
    if(req.session.role!="farmer")
        res.render('index',{title:"India's Biggest Farmer-to-Consumer Marketplace",accname: username,mainpage:"mainpage"});
    else
      req.session.message="Error: Unauthorized Access"
      req.session.level="danger"
      res.redirect('/profile/'+req.session.username)
});
module.exports = router;