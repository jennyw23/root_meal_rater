'use strict';

const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'jdbc:mysql://localhost:3306/FoodTracker',
  DATABASE_NAME: process.env.DATABASE_NAME || 'FoodTracker',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'jenny1257',
  DATABASE_PORT: process.env.DATABASE_PORT || 3306,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',

  NODE_ENV: process.env.NODE_ENV || 'development',
};

module.exports = env;