module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
    }, {
      tableName: 'categories'
    });
  
    return Category;
  };