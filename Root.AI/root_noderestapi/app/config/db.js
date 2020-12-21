'use strict'

const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/users.js')(sequelize, Sequelize);
db.meals = require('../models/meals.js')(sequelize, Sequelize);
db.ratings = require('../models/ratings.js')(sequelize, Sequelize);

//Relations
db.ratings.belongsTo(db.meals);
db.meals.belongsTo(db.users);
db.users.hasMany(db.meals);

module.exports = db;