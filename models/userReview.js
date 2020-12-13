module.exports = (sequelize, DataTypes) => {
    const UserReview = sequelize.define('userReview', {
    reviewID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    titleID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // own: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    //   allowNull: false
    // },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    dateRead: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shortReview: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longReview: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
    }, {
        tableName: 'userReviews'
      });
  
    return UserReview;
  };