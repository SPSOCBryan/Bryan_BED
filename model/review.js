var db=require('./databaseConfig');

var reviewDB={

    addReview:function(game_id,userid,content,rating,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="insert into review(game_id,userid,content,rating) values(?,?,?,?)";

                dbConn.query(sql,[game_id,userid,content,rating],function(err,result){

                    dbConn.end();

                    if(err){
                        console.log(err);
                    }
                    return callback(err,result.insertId);
                });
            }
        });
    },
    getReview:function(game_id,callback){

        var dbConn=db.getConnection();

        dbConn.connect(function(err){

            if(err){ //connection failed
                console.log(err);
                //return err and null results
                return callback(err,null);
            }
            else{ //connection success

                var sql="select r.game_id, r.content, r.rating, u.username, r.created_at from review r, user u where game_id=? and r.userid=u.userid";

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
}

module.exports=reviewDB;