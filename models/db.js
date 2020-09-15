const Mysql = require('mysql') ;

const mysqlcon = Mysql.createConnection({
  host: "localhost",
  user: "movie",
  password: "Movie123@",
  database : "Movies" 
});

mysqlcon.connect() ;

module.exports = {
    mysqlcon
}



