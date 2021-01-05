const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
const { sequelize, user, rating, meal } = require('./models')

class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
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
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());

  // Routes & Handlers
  app.post('/login', handlers.login);
  app.get('/',/* middleware.checkToken,*/ handlers.index);

  // we require routes to other folders to direct CRUD calls
  const { sequelize } = require('./models')
  require('./router/routes.js')(app);

  app.listen(port, async () => {
    console.log(`Server is listening on port: ${port}`)
    await sequelize.authenticate()
    console.log('Meal Rating Database Connected!')
})    
}

//------------------------Authentication/authorization------------------------// 
//require('./router/authorizedRoutes.js')(app);

// for using auth0 authorization, third party (I made an account--it's actually pretty cool)...
//require('./authorization/auth0.js')(app);

/*----------------------Welcome Route and App Listening--------------------------// 

// Welcome route (when you just type in localhost:3000)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Jenny's nutrition application." });
  });



app.listen({ port: 3000 }, async () => {
    console.log('Server running on localhost:3000')
    await sequelize.authenticate()
    console.log('Meal Rating Database Connected!')
})    */

main();
