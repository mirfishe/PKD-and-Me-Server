const Sequelize = require('sequelize');

let databaseURL = "";
let dialectValue = "";

if (process.env.DATABASE_DIALECT == "postgres") {
  databaseURL = process.env.DATABASE_URL_POSTGRESQL;
  dialectValue = "postgres";
} else if (process.env.DATABASE_DIALECT == "mysql") {
  databaseURL = process.env.DATABASE_URL_MYSQL;
  dialectValue = "mysql";
} else {
  // Set to postgres by default
  databaseURL = process.env.DATABASE_URL_POSTGRESQL;
  dialectValue = "postgres";
}

const sequelize = new Sequelize(databaseURL, {
  dialect:    dialectValue
});

// const sequelize = new Sequelize(process.env.DATABASE_URL_POSTGRESQL, {
//     dialect:    'postgres'
// });

// const sequelize = new Sequelize(process.env.DATABASE_URL_MYSQL, {
//   dialect:    'mysql'
// });

// new Sequelize(process.env.DATABASE_URL ||
//     `postgresql://postgres:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@localhost/blue-badge-project` {
//         dialect:    'postgres'
// });

// Removed because of the Heroku modules
// const sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.DATABASE_PASSWORD, {
//     host:   'localhost',
//     dialect:    'postgres'
// });

sequelize.authenticate()
    // .then(() => console.log('PostgreSQL db is connected.'))
    // .then(() => console.log('mySQL db is connected.'))
    .then(() => console.log(dialectValue, 'db is connected.'))
    .catch(err => console.log(err));


const User = sequelize.import('./models/user');
const UserReview = sequelize.import('./models/userReview');
const Title = sequelize.import('./models/title');
const Category = sequelize.import('./models/category');
const Media = sequelize.import('./models/media');
const Edition = sequelize.import('./models/edition');

// const Error = sequelize.import('./models/error');


User.hasOne(User, {
  foreignKey: 'updatedBy',
  sourceKey: 'userID'
  // as: 'usersUpdated'
});
User.belongsTo(User, {
  foreignKey: 'updatedBy',
  sourceKey: 'userID'
  // as: 'updatedUsers'
});


User.hasMany(UserReview, {
  foreignKey: 'userID',
  sourceKey: 'userID'
  // as: 'usersReviews'
});
UserReview.belongsTo(User, {
  foreignKey: 'userID',
  sourceKey: 'userID'
  // as: 'reviewsUsers'
});


User.hasMany(UserReview, {
  foreignKey: 'updatedBy',
  sourceKey: 'userID'
  // as: 'usersReviewUpdated'
});
UserReview.belongsTo(User, {
  foreignKey: 'updatedBy',
  sourceKey: 'userID'
  // as: 'reviewUpdatedUsers'
});

  
Title.hasMany(UserReview, {
  foreignKey: 'titleID',
  sourceKey: 'titleID'
  // as: 'titlesReviews'
  });
UserReview.belongsTo(Title, {
  foreignKey: 'titleID',
  sourceKey: 'titleID'
  // as: 'reviewsTitles'
  });


Category.hasMany(Title, {
  foreignKey: 'categoryID',
  sourceKey: 'categoryID'
  // as: 'categoryTitles'
  });
Title.belongsTo(Category, {
  foreignKey: 'categoryID',
  sourceKey: 'categoryID'
  // as: 'titlesCategories'
  });


Title.hasMany(Edition, {
  foreignKey: 'titleID',
  sourceKey: 'titleID'
  // as: 'titlesEditions'
});
Edition.belongsTo(Title, {
  foreignKey: 'titleID',
  sourceKey: 'titleID'
  // as: 'editionsTitles'
});


Media.hasMany(Edition, {
  foreignKey: 'mediaID',
  sourceKey: 'mediaID'
  // as: 'mediaEditions'
});
Edition.belongsTo(Media, {
  foreignKey: 'mediaID',
  sourceKey: 'mediaID'
  // as: 'editionsMedia'
});


module.exports = sequelize;