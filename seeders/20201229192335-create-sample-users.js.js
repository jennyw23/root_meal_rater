'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('users', [{
      userUuid: "e3f66748-ca1d-4d74-9017-3019ce9b01db",
      id: 1,
      username: "avi",
      password: "temp",
      email: "avi@gmail.com",
      createdAt: sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: sequelize.literal('CURRENT_TIMESTAMP')
      },{
      userUuid: "eb2260d5-90d2-4584-b746-221ff4fa4e81",
      id: 2,
      username: "jenny",
      password: "temp",
      email: "jenny@gmail.com",
      updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
      createdAt: sequelize.literal('CURRENT_TIMESTAMP')
      },{
      userUuid: "db8e23b2-e2fc-4115-b31a-b9f122c3e231",
      id: 3,
      username: "lizzie",
      password: "temp",
      email: "lizzie@whatistheroot.com",
      updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
      createdAt: sequelize.literal('CURRENT_TIMESTAMP')
      }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('users', null, {});
     
  }
};
