exports.users = function(req,res,next){
    res.render('users', { title: 'AgriBazaar' });
}
exports.logout = function(req,res,next){
    req.session.destroy(function(err) {
        if(err){
            console.log(err);
        }else{
            console.log("Auth: "+req.session.username+" is trying to logout.")
            req.logout();
            res.redirect('/');
        }
    });
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
            req.session.message=message;
            req.session.level="danger";
            console.log("Sending "+req.session.message);
            res.redirect('/users');
            // res.render('users',{message: message,level:"danger"});
        }
    });
    } else {
    res.send("Auth: Incorrect database query!");
    }         
};
exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
        var post  = req.body;
        var name= post.Rusername;
        var pass= post.Rpassword;
        var fname= post.Rfullname;
        var address= post.Raddress;
        var email=post.Remail;
        var role=post.Rrole;
        console.log("Role "+role);
        var sql = "INSERT INTO `Users`(`username`,`password`,`fullname`, `email`,`role`,`address`) VALUES ('" + name + "','" + pass + "','" + fname + "','" + email + "','" + role + "','" + address + "')";

        var query = db.query(sql, function(err, result) {

            message = "Succesfull! Your account has been created.";
            res.render('index',{title:"India's Biggest Farmer-to-Consumer Marketplace",accname: name,message: message,level: "info"});
        });

    } else {
        res.render('signup');
    }
};
