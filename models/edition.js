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
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ASIN: {
      type: DataTypes.STRING,
      allowNull: true
    },
    textLinkShort: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: true
    },
    textLinkFull: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true
    },
    imageLinkSmall: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true
    },
    imageLinkMedium: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true
    },
    imageLinkLarge: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true
    },
    textImageLink: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true
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