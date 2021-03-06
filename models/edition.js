
let uniqueValueText = true;
let uniqueValueString = true;

if (process.env.DATABASE_DIALECT === "postgres") {
  uniqueValueText = true;
} else if (process.env.DATABASE_DIALECT === "mysql") {
  uniqueValueText = false;
} else if (process.env.DATABASE_DIALECT === "mssql") {
  uniqueValueText = false;
} else {
  // * Set to postgres by default
  uniqueValueText = true;
};

if (process.env.DATABASE_DIALECT === "postgres") {
  uniqueValueString = true;
} else if (process.env.DATABASE_DIALECT === "mysql") {
  uniqueValueString = true;
} else if (process.env.DATABASE_DIALECT === "mssql") {
  uniqueValueString = false;
} else {
  // * Set to postgres by default
  uniqueValueString = true;
};

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
      // ! The data type of this field doesn't ignore nulls in msSQL when applying the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValueString,
      allowNull: true
    },
    textLinkShort: {
      type: DataTypes.TEXT,
      // ! The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValueText,
      allowNull: true
    },
    textLinkFull: {
      type: DataTypes.TEXT,
      // ! The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValueText,
      allowNull: true
    },
    imageLinkSmall: {
      type: DataTypes.TEXT,
      // ! The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValueText,
      allowNull: true
    },
    imageLinkMedium: {
      type: DataTypes.TEXT,
      // ! The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValueText,
      allowNull: true
    },
    imageLinkLarge: {
      type: DataTypes.TEXT,
      // ! The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValueText,
      allowNull: true
    },
    textImageLink: {
      type: DataTypes.TEXT,
      // ! The data type of this field is too large for mySQL to apply the unique constraint (adds an index)
      // unique: true,
      unique: uniqueValueText,
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