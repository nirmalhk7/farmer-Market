 exports.mycart = function(req, res, next){
	var userId =  req.session.userId;
	if(userId == null){
		res.render('users',{message:"Please login to view your cart.",level:"warning"})
		return;
    }
    // res.send(req.session.username+", you can now see CART!");
    var username=req.session.username;
    
    res.render('buyer/cart',{title:"Your Cart",accname:username,role:req.session.role});
	// var sql="SELECT * FROM `login_details` WHERE `id`='"+userId+"'";
    // db.query(sql, function(err, results){
    //     res.render('profile.ejs', {user:user});	  
    // });	 
};
exports.sellerProfile= function(req,res,next){
    var sess = req.session; 
    var userId=req.session.userId;
    if(userId==null)
    {
        req.session.message="Please login to view your Seller Dashboard";
        req.session.level="warning";
        res.redirect('/users');
    }
    res.render('seller_dashboard',{accname:req.session.username,role:req.session.role});
}
exports.search = function(req,res,next){
    var username=req.session.username;
    var userId=req.session.userId;
    var role=req.session.role;
    if (role=="shopper"){
        console.log("express-session: "+username+" is found from the Cache")
        res.render('search',{accname: username});
    }
    
}