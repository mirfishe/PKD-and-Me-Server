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
        allowNull: false
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
        tableName: 'editions'
      });
  
    return Edition;
  };