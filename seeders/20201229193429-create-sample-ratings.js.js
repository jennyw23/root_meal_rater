'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('ratings', [
      {
        userUuid: "e3f66748-ca1d-4d74-9017-3019ce9b01db",
        mealUuid: "8b62d071-0def-49fc-bdfc-5254aa82b7cb",
        ratingNum: 5
      },{
        userUuid: "e3f66748-ca1d-4d74-9017-3019ce9b01db",
        mealUuid: "8c849a9d-9b90-45f6-9036-c3d2e6b2d2f4",
        ratingNum: 2
      },{
        userUuid: "eb2260d5-90d2-4584-b746-221ff4fa4e81",
        mealUuid: "fa5be34d-6039-44a3-9a74-3ae17e20c609",
        ratingNum: 5
      },{
        userUuid: "eb2260d5-90d2-4584-b746-221ff4fa4e81",
        mealUuid: "8c849a9d-9b90-45f6-9036-c3d2e6b2d2f4",
        ratingNum: 4
      },{
        userUuid: "db8e23b2-e2fc-4115-b31a-b9f122c3e231",
        mealUuid: "8c849a9d-9b90-45f6-9036-c3d2e6b2d2f4",
        ratingNum: 3
      },{
        userUuid: "db8e23b2-e2fc-4115-b31a-b9f122c3e231",
        mealUuid: "fa5be34d-6039-44a3-9a74-3ae17e20c609",
        ratingNum: 1
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
