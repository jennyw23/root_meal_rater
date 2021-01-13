'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({rating}) {
      // define association here
      // A meal can have many ratings from different users. Watermelon can be rated differently by different users; but it uses the same mealId for watermelon
      this.hasMany(rating, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    }
    // hides the meal ID number so that the json string doesn't tell the user what number user they are in the database
  /*toJSON(){
    return { ...this.get(), id: undefined, uuid: undefined}
    }*/
  }

  meal.init({
    mealUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Meal must have a name'},
        notEmpty: { msg: 'Meal name must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'meals',
    modelName: 'meal',
  });
  
  return meal;
};