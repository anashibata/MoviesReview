const db = require('./db') 
const bcrygt = require("bcryptjs");

//Inserting a new user
insUser = function(record) {
   sql = 'INSERT INTO users (FirstName, SurName, Email, Password) VALUES (?, ?, ?, ?)'
    var values = [record.firstname, record.surname, record.email, record.password]; 

    return new Promise(function(resolve, reject) {   
      db.mysqlcon.query(sql, values, function (err, result) {
        if (err) { return reject(err); }        
        resolve(result);
      });
    });
}

hasUser = function(password) {
  return new Promise(function(resolve, reject) {   
    bcrygt.hash(password, 8, function(err, hash) {
      if (err) { reject(err); }        
      resolve(hash);
    });
  });
}

module.exports = {
  insUser,
  hasUser
}