'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('meals', [{
      mealUuid: "8b62d071-0def-49fc-bdfc-5254aa82b7cb",
      id: 1,
      mealName: "mango",
      calories: "80",
      updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
      createdAt: sequelize.literal('CURRENT_TIMESTAMP')
      },{
      mealUuid: "fa5be34d-6039-44a3-9a74-3ae17e20c609",
      id: 2,
      mealName: "watermelon",
      calories: "45",
      updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
      createdAt: sequelize.literal('CURRENT_TIMESTAMP')
    }, {
      mealUuid: "8c849a9d-9b90-45f6-9036-c3d2e6b2d2f4",
      id: 3,
      mealName: "spaghetti",
      calories: "400",
      updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
      createdAt: sequelize.literal('CURRENT_TIMESTAMP')
    }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('meals', null, {});
    
  }
};
