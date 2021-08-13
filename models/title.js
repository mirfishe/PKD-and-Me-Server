module.exports = (sequelize, DataTypes) => {
  const Title = sequelize.define('title', {
    titleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // * Used to properly sort the titles alphabetically
    // * https://stackoverflow.com/questions/3252577/how-to-sort-in-sql-ignoring-articles-the-a-an-etc
    titleSort: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titleURL: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    authorFirstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authorLastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    urlPKDweb: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'titles'
  });

  return Title;
};