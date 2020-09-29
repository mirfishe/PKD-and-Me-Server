module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define('media', {
    mediaID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    media: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
      tableName: 'media'
    });
  
    return Media;
  };