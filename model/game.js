var db=require('./databaseConfig');

var gameDB={

    getGames:function(callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="select title, game_id, game.description, price, platform, catname, year, game.picture from game, category where game.categoryid=category.cat_id";

                dbConn.query(sql,[],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },

    addGame:function(title,description,price,platform,categoryid,year,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="insert into game(title,description,price,platform,categoryid,year) values(?,?,?,?,?,?)";

                dbConn.query(sql,[title,description,price,platform,categoryid,year],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result.insertId);
                });
            }
        });
    },
    getGame:function(platform,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="select game_id, title, game.description, price, platform, cat_id, catname, year, created_at from game, category where platform=? and game.categoryid=category.cat_id";

                dbConn.query(sql,[platform],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    deleteGame:function(game_id,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="delete from game where game_id=?";

                dbConn.query(sql,[game_id],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    updateGame:function(game_id,title,description,price,platform,categoryid,year,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="update game set title=?, description=?, price=?, platform=?, categoryid=?, year=? where game_id=?";

                dbConn.query(sql,[game_id,title,description,price,platform,categoryid,year],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    cheapGames:function(callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="SELECT * FROM spgames.game order by price asc LIMIT 3;";

                dbConn.query(sql,[],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    getCatGame:function(game_id,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="SELECT c.cat_id, c.catname FROM spgames.game g JOIN spgames.game_category gc ON gc.gameid = g.game_id JOIN spgames.category c ON gc.catid = c.cat_id WHERE g.game_id=?;";

                dbConn.query(sql,[game_id],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    getThatGame:function(title,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="select game.game_id, game.title, game.platform, game.picture, category.catname, game.year, game.description, game.price from game, category where game.title=? and game.categoryid=category.cat_id;";

                dbConn.query(sql,[title],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    getThoseGames:function(title,platform,price,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="SELECT game.title, game.platform, game.picture, category.catname, game.year, game.description, game.price from game, category WHERE title=? AND platform=? AND price=? and game.categoryid=category.cat_id";

                dbConn.query(sql,[platform,title,price],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    getPlatGame:function(callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="SELECT DISTINCT platform from game";

                dbConn.query(sql,[],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    getPriceGame:function(callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="SELECT DISTINCT price from game";

                dbConn.query(sql,[],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    }
}

module.exports=gameDB;