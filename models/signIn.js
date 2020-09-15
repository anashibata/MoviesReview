const db = require('./db') 
const bcrygt = require("bcryptjs");

//Locate user 
SignIn = function(email) {       
  return new Promise(function(resolve, reject) {   
    let sql = "SELECT US.Id, US.FirstName, US.SurName, US.Email, US.Password from users US WHERE US.Email = ?"
    db.mysqlcon.query(sql, [email], function (err, rows, fields) {
        if (err) { return reject(err); }    
        resolve(rows);
    });   
  });
}

DecrPass = function(password, hashpassword) {   
  return new Promise(function(resolve, reject) {  
    bcrygt.compare(password, hashpassword, function(err, hash) {
      if (err) { console.log('sem falhas'); reject(err); }      
      resolve(hash);
    });
  });
} ;

module.exports = {
    SignIn,
    DecrPass
}

