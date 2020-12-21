module.exports = (sequelize, DataTypes) => {
    const Meal = sequelize.define('meal', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        calories: DataTypes.INTEGER,
      }
    );
  
    Meal.associate = (models) => {
      Meal.belongsTo(models.user);
    };
  
    return Meal;
  }