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
    }
    }, {
      tableName: 'media'
    });
  
    return Media;
  };