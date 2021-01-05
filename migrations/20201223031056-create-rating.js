'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ratingUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      ratingScore: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Rating belongsTo User 1:1
          model: 'users',
          key: 'id'
        }
      },
      mealId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Rating belongsTo Meal 1:1
          model: 'meals',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('ratings');
  }
};