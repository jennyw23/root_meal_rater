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

main();
