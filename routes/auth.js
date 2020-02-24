exports.users = function(req,res,next){
    var sess = req.session; 
    var message=req.session.message;
    if(req.session.message!=null)
    {
        var level=req.session.level;
        console.log("session.message",level+": "+message);
        res.render('users', { title: 'AgriBazaar',message:message,level:level });
        delete res.session.message;
        delete res.session.level;
    }
    else
    {
        res.render('users', { title: 'AgriBazaar' });
    }
}
exports.logout = function(req,res,next){
    console.log("Auth: Trying to logout.");
    var sess = req.session; 
    console.log("Auth: "+req.session.username+" is trying to logout.");
    req.session.destroy(function(err){
        if(err){
            console.log("Auth:"+err);
        }else{
            console.log("Auth: Logged Out!");
            res.redirect('/');
        }
    });

}
exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
    
    if(req.method == "POST"){
    var post  = req.body;
    var email_username= post.user_email;
    var pass= post.user_password;
    console.log("auth","Recieved "+email_username+" w/ Password: "+pass);
    var sql="CALL Users_verify('"+email_username+"','"+pass+"');";
    //var sql="select id,email,fullname,username,role from `Users` where (`email`='"+email_username+"' OR `username`='"+email_username+"') AND password='"+pass+"'";
    db.query(sql, function(err, results){ 
        if (err) {
            return console.error(err);
        }
        var json=JSON.parse(JSON.stringify(results[0]));
        if(json[0]!=null){
            req.session.userId=json[0].id;
            req.session.role=json[0].role;
            req.session.username=json[0].username;
            console.info("auth",json[0].fullname+" just logged in!");
            if(json[0].role=="shopper")
            {
                res.redirect('/');
            }
            else
            {
                res.redirect('/dashboard');
            }
        }
        else
        {
            var sess = req.session; 
            console.warn("auth","Incorrect Username "+email_username+" /Password "+pass);
            req.session.message="Incorrect credentials. Please try again.";
            req.session.level="danger";
            res.redirect('/users');
        }
    })};
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
        var sql = "call Users_register('"+name+"','"+pass+"','"+fname+"','"+email+"','"+role+"','"+address+"');";
        var query = db.query(sql, function(err, result) {
            if (err) {
                return console.error(err);
            }
            message = "Succesfull! Your account has been created.";

            res.render('index',{title:"India's Biggest Farmer-to-Consumer Marketplace",accname: name,message: message,level: "info"});
        });
        

    } else {
        res.render('signup');
    }
};
