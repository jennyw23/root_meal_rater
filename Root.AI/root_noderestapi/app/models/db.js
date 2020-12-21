const mysql = require("mysql");
const dbConfig = require("../config/env.js");

// Create a connection to the database
/*const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to FoodTracker database.");
});
*/

const Sequelize = require('sequelize');

// Create a connection to the database through Sequelize ORM
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log('Sequelize connection to MySQL established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});


module.exports = sequelize;