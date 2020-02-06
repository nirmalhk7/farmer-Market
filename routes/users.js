var express = require('express');
var router = express.Router();

router.get('welcome', function(req, res, next) {
   res.render('users', { title: 'AgriBazaar' });
});

module.exports = router;