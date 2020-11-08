module.exports = (sequelize, DataTypes) => {
    const Error = sequelize.define('error', {
    errorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    errorDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    errorPage: {
      type: DataTypes.TEXT,
      allowNull: false
    }
    }, {
      tableName: 'errors'
    });
  
    return Error;
  };