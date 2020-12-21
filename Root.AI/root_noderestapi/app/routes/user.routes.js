module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new User
    app.post("/users", users.create);
  
    // Retrieve all Users
    app.get("/users", users.findAll);
  
    // Retrieve a single User with userId
    app.get("/users/:userid", users.findOne);
  
    // Update a User with userId
    app.put("/users/:userid", users.update);
  
    // Delete a User with userId
    app.delete("/users/:userid", users.delete);
  
    // Create a new User
    app.delete("/users", users.deleteAll);
  };