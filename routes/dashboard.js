 exports.mycart = function(req, res, next){
	var userId =  req.session.userId;
	if(userId == null){
		res.redirect("/users");
		return;
    }
    // res.send(req.session.username+", you can now see CART!");
    res.render('cart');
	// var sql="SELECT * FROM `login_details` WHERE `id`='"+userId+"'";
    // db.query(sql, function(err, results){
    //     res.render('profile.ejs', {user:user});	  
    // });	 
};
exports.logout = function(req,res,next){
    req.session.destroy(function(err) {
    })
    res.redirect('/');
}