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
    res.render('cart',{title:"Your Cart",accname:username,role:req.session.role});
	// var sql="SELECT * FROM `login_details` WHERE `id`='"+userId+"'";
    // db.query(sql, function(err, results){
    //     res.render('profile.ejs', {user:user});	  
    // });	 
};
exports.sellerProfile= function(req,res,next){
    res.render('seller');
}
exports.search = function(req,res,next){
    if(req.method == "POST"){
        var post  = req.body;
        var username=req.session.username;
        var userId=req.session.userId;
        var role=req.session.role;
        var searchquery=post.search;
        console.log("attempt to search "+searchquery);
        res.render('search',{accname: username,searchitem:searchquery});
    }
    else{
        res.redirect('/');
    }
    
}