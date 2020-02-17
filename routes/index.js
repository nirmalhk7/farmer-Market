var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var username=req.session.username;
    var userId=req.session.userId;
    console.log("Now showing Dashboard with "+username+" signed in!")
    res.render('index',{accname: username});
});
module.exports = router;