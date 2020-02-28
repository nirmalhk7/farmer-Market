 exports.mycart = function(req, res, next){
    console.log("VIEWLOG",req.session.username+" viewing his cart");
	var userId =  req.session.userId;
	if(userId == null){
        req.session.message="Please login to view your cart."
        req.session.level="warning"
		res.render('main/auth',{title:"Join Us!"})
		return;
    }
    // res.send(req.session.username+", you can now see CART!");
    var username=req.session.username;
    let sql="call Cart_getItems("+userId+"+);";
    db.query(sql,function(results,error){
        if(error)
        {
            throw console.error("MySQL Error",error);
        }
        var rep=JSON.parse(JSON.stringify(results[0]));
        res.render('shoppers/cart',{title:"Your Cart",accname:username,role:req.session.role,cartItems:rep});
    })
    
	// var sql="SELECT * FROM `login_details` WHERE `id`='"+userId+"'";
    // db.query(sql, function(err, results){
    //     res.render('profile.ejs', {user:user});	  
    // });	 
};
