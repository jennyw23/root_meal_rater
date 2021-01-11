const express = require('express');
const bodyParser = require('body-parser');

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  const port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());

  // we require routes to other folders to direct CRUD calls
  const { sequelize } = require('./models')
  require('./router/routes.js')(app);
  require('./router/entry_routes.js')(app);

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
