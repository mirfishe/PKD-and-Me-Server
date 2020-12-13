
let uniqueValue = true;

if (process.env.DATABASE_DIALECT == "postgres") {
  uniqueValue = true;
} else if (process.env.DATABASE_DIALECT == "mysql") {
  uniqueValue = false;
} else {
  // Set to postgres by default
  uniqueValue = true;
}

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
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // free: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    //   allowNull: false
    // },
    ASIN: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    textLinkShort: {
      type: DataTypes.TEXT,
      // The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValue,
      allowNull: true
    },
    textLinkFull: {
      type: DataTypes.TEXT,
      // The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValue,
      allowNull: true
    },
    imageLinkSmall: {
      type: DataTypes.TEXT,
      // The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValue,
      allowNull: true
    },
    imageLinkMedium: {
      type: DataTypes.TEXT,
      // The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValue,
      allowNull: true
    },
    imageLinkLarge: {
      type: DataTypes.TEXT,
      // The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValue,
      allowNull: true
    },
    textImageLink: {
      type: DataTypes.TEXT,
      // The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValue,
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