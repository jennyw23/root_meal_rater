// Note: This migration is called "change calories to image, but it is really just removing
//the calories column"
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await 
      queryInterface.removeColumn("meals", "calories")
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn("meals", "calories");

  }
};
