const express = require('express')
const router = express.Router()
const ModelSignUp = require('../models/SignUp')

//The user will sign Up (se cadastrar no sistema)
//render to Schedule form
router.get('/', (req, res) => {
  res.render('signup')
})


router.post('/', (req, res) => {    

  ModelSignUp.hasUser(req.body.password).then(function(hash) {    
    req.body.password = hash 
    ModelSignUp.insUser(req.body).then(function(user) {    
      res.render('signinout')     
    }).catch((err) => setImmediate(() => { throw err; }));
  }).catch((err) => setImmediate(() => { throw err; }));    
  
})

module.exports = router
