'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({rating}) {
      // define association here
      this.hasMany(rating, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    }
    // hides the user ID number so that the json string doesn't tell the user what number user they are in the database
    /*toJSON(){
      return { ...this.get(), id: undefined}
    }*/
  }
  user.init({
    userUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have a name'},
        notEmpty: { msg: 'Name must not be empty'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have a password'},
        notEmpty: { msg: 'Password must not be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have an email'},
        notEmpty: { msg: 'Email must not be empty'},
        isEmail: {msg: 'Must be a valid email address'}
      }
    }}, 
    // options
    {
      sequelize,
      tableName: 'users',
      modelName: 'user',
  });
  return user;
};