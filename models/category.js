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
    },
    // categoryURL: {
    //   type: DataTypes.STRING,
    //   unique: true,
    //   allowNull: false
    // },
    sortID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'categories'
  });

  return Category;
};