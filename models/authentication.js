const express = require('express')
const session = require('express-session')

function setUserSession(user) {
    return new Promise(function(resolve, reject) {               
        session.Id = user[0].Id      
        session.FirstName = user[0].FirstName
        session.Email = user[0].Email
        session.Password = user[0].Password         
        resolve()
    });    
}

function getUserSession() {
    return new Promise(function(resolve, reject) {   
        userSession = {  
            Id : session.Id,
            FirstName : session.FirstName,
            Email : session.Email,
            Password : session.Password ,
        }   
        resolve(userSession)        
    });    
}


module.exports = {
    setUserSession,
    getUserSession
}