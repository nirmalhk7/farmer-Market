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
exports.sellerProfile= function(req,res,next){
    var sess = req.session;
    if(req.session.userId!=null)
    {
        var sql="CALL Seller_getLastSales("+req.session.userId+");"
        db.query(sql,function(err,results){
            if(err)
            {
                throw console.error("SQL Error",err);
            }
            var sales=JSON.parse(JSON.stringify(results[0]))
            console.log(sales);
            res.render('seller',{title:"Seller Dashboard",accname:req.session.username,role:req.session.role,lastsales:sales});
        });
    }
}
exports.search = function(req,res,next){
    if(req.method == "POST"){
        var post  = req.body;
        var username=req.session.username;
        var userId=req.session.userId;
        var role=req.session.role;
        var searchquery=post.search;
        console.log("attempt to search "+searchquery);
        res.render('search',{title:"Search",accname: username,searchitem:searchquery});
    }
    else{
        res.redirect('/');
    }
    
}