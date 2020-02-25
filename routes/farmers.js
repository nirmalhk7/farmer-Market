exports.lastSales= function(req,res,next){
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
            res.render('farmers/dashboard',{title:"Seller Dashboard",accname:req.session.username,role:req.session.role,lastsales:sales});
        });
    }
}
