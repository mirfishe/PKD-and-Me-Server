module.exports = (sequelize, DataTypes) => {
    const AmazonLink = sequelize.define('amazonLink', {
    amazonLinkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    textLinkShort: {
        type: DataTypes.STRING,
        allowNull: false
    },
    textLinkFull: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageLinkSmall: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageLinkMedium: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageLinkLarge: {
        type: DataTypes.STRING,
        allowNull: false
    },
    textImageLink: {
        type: DataTypes.STRING,
        allowNull: false
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