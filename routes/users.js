var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.username!=null)
    {
        var sess = req.session; 
        var message=req.session.message;
        console.log("Message "+req.session.message);
        if(req.session.message!=null)
        {
            var level=req.session.level;
            console.log("Recieving "+message);
            res.render('users', { title: 'AgriBazaar',message:message,level:level });
            delete res.session.message;
            delete res.session.level;
        }
        else
        {
            res.render('users', { title: 'AgriBazaar' });
        }
    }
    else
    {
        res.redirect('/');
    }
});

module.exports = router;