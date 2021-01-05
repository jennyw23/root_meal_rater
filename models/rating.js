'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user, meal}) {
      // define association here
      // looks for name of model+primary key (user+id=userid); we redefine foreignKey to userId
      this.belongsTo(user, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
      this.belongsTo(meal, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })

    }
    /*toJSON(){
      return { ...this.get(), id: undefined }
    }*/
  }

  rating.init({
    // rename these to "ratingID"
    ratingUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    ratingScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ratings',
    modelName: 'rating',
  });
  return rating;
};