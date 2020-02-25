 exports.mycart = function(req, res, next){
    var userId =  req.session.userId;
    if(userId == null){
        var sess = req.session; 
        req.session.message="Please login to view your cart";
        req.session.level="warning";
        res.redirect('/users');
		return;
    }
    // res.send(req.session.username+", you can now see CART!");
    var username=req.session.username;
    let sql="call Cart_getItems("+userId+")";
    db.query(sql,function(err,results){
        if(err)
        {
            throw console.error("SQL Error",err);
        }
        var cart= JSON.parse(JSON.stringify(results[0]));
        console.log("Cart",cart);
    res.render('cart',{title:"Your Cart",accname:username,role:req.session.role,cartItems:cart});
    });
    
	// var sql="SELECT * FROM `login_details` WHERE `id`='"+userId+"'";
    // db.query(sql, function(err, results){
    //     res.render('profile.ejs', {user:user});	  
    // });	 
};