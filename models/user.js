module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
  //   userID: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     primaryKey: true,
  //     autoIncrement: true
  // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example
  // User.associate = function(models) {
  //   User.hasMany(models.List, {
  //     foreignKey: 'userID',
  //     sourceKey: 'userID',
  //     as: 'userLists'
  //   });
  // };

  return User;
};