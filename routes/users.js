var express = require('express');
var router = express.Router();


router.get('/users', function(req, res, next) {
   console.log(res)
   res.send("USERS!")
});

module.exports = router;