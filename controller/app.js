var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = require('../model/user.js');
var game = require('../model/game.js');
var category = require('../model/category.js');
var reviewDB = require('../model/review.js');
var verifyToken = require('../auth/verifyToken.js');
var cors = require('cors');
const gameDB = require('../model/game.js');
var categoryDB = require('../model/category.js');

app.options('*',cors());
app.use(cors());
var urlencodedParser=bodyParser.urlencoded({extended:false});


app.use(bodyParser.json());
app.use(urlencodedParser);

app.get('/user/:userid',function(req, res){
    var id = req.params.userid;

    user.getUser(id, function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });
}); 

app.post('/user/login',function(req, res){
    var email=req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function(err, token, result){
        if(!err){
			res.statusCode = 200;
			  res.setHeader('Content-Type', 'application/json');
			  delete result[0]['password'];//clear the password in json data, do not send back to client
			  console.log(result);
			res.json({success: true, UserData: JSON.stringify(result), token:token, status: 'You are successfully logged in!'}); 
			res.send();
		}else{
            res.status(500);
            res.send(err.statusCode);
        }
    }); 
}); 


app.post('/user/logout', function(req,res){
	console.log("..logging out.");
	//res.clearCookie('session-id'); //clears the cookie in the response
	//res.setHeader('Content-Type', 'application/json');
  	res.json({success: true, status: 'Log out successful!'});

});

//step 1: if()else(forbidden);
//step 2: Do header authorisation;

app.put('/user',verifyToken,function(req,res){
	var username = req.body.username;
	var email = req.body.email;
	var role = req.body.role;
	
	user.updateUser(username,email,role,function(err,result){
		if(!err){
			console.log("Update successful");
			res.statusCode = 200;
  			res.setHeader('Content-Type', 'application/json');
  			res.json({success: true, result: result, status: 'Record updated successfully!'});
		}else{
			res.status(500);
			res.send(err.statuscode);
		}
	})
}); 


app.post('/user',function(req,res){
	
	var username = req.body.username;
	var email = req.body.email;
	var role = req.body.role;
	var password = req.body.password;
	
	user.addUser(username,email,role,password,function(err,result){
	if(!err){
		res.status(200);
		res.send(result);
	}else{
		res.status(500);
		res.send("{\"message\":\"Some error!\"}");
	}
	});
});

app.get('/user',function(req, res){

    user.getUsers(function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send(null);
        }
    });
}); 

app.get('/games',function(req,res){

    game.getGames(function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
			res.status(200);
			res.send(result);
        }
    });
});

app.get('/categories',function(req,res){

    category.allCategories(function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
			res.status(200);
			res.send(result);
        }
    });
});

app.get('/categories/:catname',function(req,res){

    var catname = req.params.catname;

    category.thatCategory(catname,function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
			res.status(200);
			res.send(result);
        }
    });
});

app.post('/game',verifyToken,function(req,res){

    var title=req.body.title;
    var description=req.body.description;
    var price=req.body.price;
    var platform=req.body.platform;
    var categoryid=req.body.categoryid;
    var year=req.body.year
    if(req.role=="Admin"){
        
        gameDB.addGame(title,description,price,platform,categoryid,year,function(err,result){

            if(err){
                res.status(500);
                res.send(`{"Result":"Internal Server Error"}`);
            }
            else{
                res.status(201);
                res.send(`{"gameid":${JSON.stringify(result)}}`);
            }
        });
    }else{
        console.log('Error');
    }

    
});

app.get('/games/:title',function(req,res){

	var title = req.params.title;

    gameDB.getThatGame(title,function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
			res.status(200);
			res.send(result);
        }
    });
});

app.get('/games/:platform/:title/:price',function(req,res){

    var platform = req.params.platform;
    var title = req.params.title;
    var price = req.params.price;

    gameDB.getThoseGames(platform,title,price,function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
			res.status(200);
			res.send(result);
        }
    });
});

app.get('/values',function(req,res){

    gameDB.getPlatGame(function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
			res.status(200);
			res.send(result);
        }
    });
});

app.get('/valuess',function(req,res){

    gameDB.getPriceGame(function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
			res.status(200);
			res.send(result);
        }
    });
});

app.post('/user/:uid/game/:gid/review/', verifyToken, function(req,res){

    var game_id=req.params.gid;
    var userid=req.params.uid;
    var content=req.body.content;
    var rating=req.body.rating;
    
    reviewDB.addReview(game_id,userid,content,rating,function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
            res.status(201);
            res.send(`{"reviewid":"${JSON.stringify(result)}"}`);
        }
    });
});

app.get('/games/:id/review',function(req,res){

    var game_id=req.params.id;

    reviewDB.getReview(game_id,function(err,result){

        if(err){
            res.status(500);
            res.send(`{"Result":"Internal Server Error"}`);
        }
        else{
            res.status(200);
            res.send(result);
        }
    });
    
});

app.post('/category',function(req,res){

    var catname=req.body.catname;
    var description=req.body.description;

    categoryDB.addCategory(catname,description,function(err,result){

        if(err){
            if(err.errno==1062){
                res.status(422);
                res.send(`{"Result":"Unprocessable Entity. Category has already been created"}`);
            }
            else{
                res.status(500);
                res.send(`{"Result":"Internal Server Error"}`);
            }
        }
        else{
            res.status(204);
            res.send(`{"Result":"Category Updated"}`);
        }
    });
});


module.exports = app;