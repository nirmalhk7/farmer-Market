
exports.login_signup_render= function(req,res,next){
    console.log("Login ",req.session.username);
    if(req.session.username==null)
    {
        var sess = req.session; 
        var message=req.session.message;
        console.log("Message "+req.session.message);
        if(req.session.message!=null)
        {
            var level=req.session.level;
            console.log("Recieving "+message);
            res.render('main/auth', { title: 'AgriBazaar',message:message,level:level });
            delete res.session.message;
            delete res.session.level;
        }
        else
        {
            res.render('main/auth', { title: 'AgriBazaar' });
        }
    }
    else
    {
        res.redirect('/');
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
    console.log("Remember",post.remember)
    var email_username= post.user_email;
    var pass= post.user_password;
    console.log("auth","Recieved "+email_username+" w/ Password: "+pass);
    var sql="CALL Users_verify('"+email_username+"','"+pass+"');";
    //var sql="select id,email,fullname,username,role from `Users` where (`email`='"+email_username+"' OR `username`='"+email_username+"') AND password='"+pass+"'";
    db.query(sql, function(err, results){ 
        if (err) {
            return console.error("SQL Error",err);
        }
        var json=JSON.parse(JSON.stringify(results[0]));
        if(json[0]!=null){
            req.session.userId=json[0].id;
            req.session.role=json[0].role;
            req.session.username=json[0].username;
            console.info("auth",json[0].fullname+" just logged in!");
            if(post.remember=="on")
                res.cookie('username',json[0].username,{maxAge: 2630000})
                res.cookie('role',json[0].role,{maxAge: 2630000});
                res.cookie('userId',json[0].id,{maxAge: 2630000})
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
    })}
    else{
        res.redirect('/')
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
function search_callback(searchquery,callback)
{
    db.query("call search_All('"+searchquery+"')", function(err, rows) {
    if (err) {
        callback(err, null);
    } else 
        callback(null, rows[0]);
    });
}
exports.getItemSeller = function(req,res,next){
    var username=req.session.username;
    var userId=req.session.userId;
    var role=req.session.role;
    if(role!="farmer")
    {
        var sql="call search_getSellers("+req.params.itemid+");select name,category,description from Items where id=1;";
        db.query(sql,function(err,op){
            if(err)
            {
                throw console.error("SQL Error",err)
            }
            
            var ans=JSON.parse(JSON.stringify(op[0]))
            console.log("TESTING",op[2])
            var itemdetails=JSON.parse(JSON.stringify(op[2]))
            console.log("TESTING",itemdetails[0])
            console.log(username+" getting sellers ",ans);
            res.render('main/itemSeller',{title:itemdetails[0].name+" at cheapest rates!",accname:username,itemSellers:ans})

        })
    }
    else
    {
        res.redirect('/');
    }
}
exports.search = function(req,res,next){
    if(req.method=="GET")
    {
        var username=req.session.username;
        var userId=req.session.userId;
        var role=req.session.role;
        var searchquery=req.query.search;
        console.log(username+" searching:",searchquery)
        // search_callback(searchquery, function(err, content) {
        //     if (err) {
        //         throw console.error(err);
        //     } else {
        //         res = content;
        //         console.log(res);
        //     }
        // });
        //var ans=JSON.parse(JSON.stringify(res))
        let sql="call search_All('"+searchquery+"');"
        db.query(sql,function(err,answ){
            if(err)
            {
                throw console.error("SQL Error",err);
            }
            let ans=JSON.parse(JSON.stringify(answ[0]));
            console.log(username,"Queried "+ans)
            res.render('main/search',{title:"Search",accname: username,searchitems:ans});
        })
    }
    else{
        res.redirect('/');
    }   
}