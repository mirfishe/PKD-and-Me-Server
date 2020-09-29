module.exports = (sequelize, DataTypes) => {
    const AmazonLink = sequelize.define('amazonLink', {
    amazonLinkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
        tableName: 'amazonLinks'
      });

    return AmazonLink;
  };