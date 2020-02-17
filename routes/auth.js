exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
    
    if(req.method == "POST"){
    var post  = req.body;
    var email= post.user_email;
    var pass= post.user_password;
    console.log("Auth: Recieved "+email+" w/ Password: "+pass)
    var sql="select id,email,fullname,username from `Users` where `email`='"+email+"' AND password='"+pass+"'";
    db.query(sql, function(err, results){      
        if(results.length){
            console.log("Result "+results[0]);
            req.session.userId=results[0].id;
            req.session.username=results[0].username;
            // res.render('index',{accname: results[0].username});
            res.redirect('/');
        }
        else{
            console.log("Auth: Incorrect Credentials "+email+"- "+pass)
            message = 'Wrong Credentials.';
            res.render('users',{message: message});
        }
    });
    } else {
    res.send("Auth: Incorrect database query!");
    }         
 };