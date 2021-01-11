'use strict';

module.exports = function(app) {

    let jwt = require('jsonwebtoken');
    let config = require('../config');
    const { sequelize, user, rating, meal } = require('../models')


    // POST a new user
app.post('/login', async(req, res) => {
    const { username, password } = req.body

    try {
        const User = await user.findOne({
            where: {username: username},
        });
        if (!User)
        return res.status(400).json({
          message: "User Not Exist"
        });
        if (username && password) {
          if (username === User.username && password === User.password) {
            let token = jwt.sign({username: username},
              config.secret,
              { expiresIn: '24h' // expires in 24 hours
              }
            );
            // return the JWT token for the future API calls
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token
            });
          } else {
            res.sendStatus(403).json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
        } else {
          res.sendStatus(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
          });
        }
        
        } catch(err) {
          console.log(err)
          return res.status(500).json({error: 'Something went wrong. User not updated.'})
        } 
    })
}



