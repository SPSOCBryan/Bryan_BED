var db=require('./databaseConfig');

var categoryDB={

    addCategory:function(catname,description,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="insert into category(catname,description) values(?,?)";

                dbConn.query(sql,[catname,description],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },

    updateCategory:function(catname,description,cat_id,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="update category set catname=?, description=? where cat_id=?";

                dbConn.query(sql,[catname,description,cat_id],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result);
                });
            }
        });
    },
    allCategories:function(callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="SELECT catname, description, picture, cat_id from category";

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
    thatCategory:function(catname,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="SELECT game.title, game.description, game.picture, game.price FROM category, game WHERE category.cat_id = game.categoryid AND category.catname=?;";

                dbConn.query(sql,[catname],function(err,result){

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

module.exports=categoryDB;