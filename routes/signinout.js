const express = require('express')
const router = express.Router()
const Auth = require('../models/authentication')
const ModelSignIn = require('../models/SignIn')

//render to Login form
router.get('/', (req, res) => {
  res.render('signinout')
})

router.post('/', (req, res) => {
  //LogIn
  ModelSignIn.SignIn(req.body.email).then(function (user) {
    console.log('Users: '+user)    
    if (user[0] == undefined) {
      console.log('User not found!')
      res.render('signup')      
    } else {      
      req.session.Id = user[0].Id
      req.session.FirstName = user[0].FirstName
      req.session.Email = user[0].Email
      req.session.Password = user[0].Password
  
      ModelSignIn.DecrPass(req.body.password, req.session.Password).
      then(function (hash) {
        if (!hash) {
          console.log('Password invalid!')
          res.render('signinout')
        }
        else {
          //User is logged          
          Auth.setUserSession(user).
          then(function() {
            res.render('index', {userName : req.session.FirstName})                
          })
        }
      }).catch(err => {console.log('Invalid password')})                 
    }
  }).catch(err => {
    console.log(err)
  })


})

router.get('/signout', (req, res) => {
  req.session.destroy(function (err) {
    res.render('index', {userName :''})
  });
})


module.exports = router;
