module.exports = (sequelize, DataTypes) => {
    const Edition = sequelize.define('edition', {
    editionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mediaID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amazonLinkID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
    }, {
        tableName: 'editions'
      });
  
    return Edition;
  };