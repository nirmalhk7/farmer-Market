exports.users = function(req,res,next){
    res.render('users', { title: 'AgriBazaar' });
}
exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
    
    if(req.method == "POST"){
    var post  = req.body;
    var email= post.user_email;
    var pass= post.user_password;
    console.log("Auth: Recieved "+email+" w/ Password: "+pass)
    // var sql=" CALL loginCheck("+email+","+pass+",@id,@username,@role);select @id as `id`,@username as `username`,@role as `role`;";
    var sql="select id,email,fullname,username,role from `Users` where `email`='"+email+"' AND password='"+pass+"'";
    db.query(sql, function(err, results){      
        if(results.length){
            console.log("Result "+results[0]);
            req.session.userId=results[0].id;
            req.session.role=results[0].role;
            req.session.username=results[0].username;
            // res.render('index',{accname: results[0].username});
            if(results[0].role=="shopper")
            {
                res.redirect('/');
            }
            else
            {
                res.redirect('/dashboard');
            }
        }
        else{
            console.log("Auth: Incorrect Credentials "+email+"- "+pass)
            message = 'Sorry, but your email or password is incorrect.';
            res.render('users',{message: message,level:"danger"});
        }
    });
    } else {
    res.send("Auth: Incorrect database query!");
    }         
};