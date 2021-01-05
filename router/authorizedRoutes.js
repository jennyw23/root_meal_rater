'use strict';

module.exports = function(app) {
    var jwt = require('jsonwebtoken');

    const { sequelize, user, rating, meal } = require('../models')

// Register the route to get a new token
// In a real world scenario we would authenticate user credentials
// before creating a token, but for simplicity accessing this route
// will generate a new token that is valid for 2 minutes
app.get('/token', function(req, res){
    var token = jwt.sign({username:"root"}, 'supersecret',{expiresIn: 120});
    res.send(token)
  })
  
  // Register a route that requires a valid token to view data
  app.get('/api', function(req, res){
    var token = req.query.token;
    jwt.verify(token, 'supersecret', function(err, decoded){
      if(!err){
        var secrets = {"accountNumber" : "938291239","pin" : "11289","account" : "Finance"};
        res.json(secrets);
      } else {
        res.send(err);
      }
    })
  })
}

