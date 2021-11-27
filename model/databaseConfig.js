var mysql = require('mysql');

var dbconnect = {
getConnection: function() {
    var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SPsp2021!!!!",
    database: "spgames"
});
return conn;
}
};

module.exports = dbconnect