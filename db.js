const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:    'postgres'
});

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
    .then(() => console.log('postgres db is connected.'))
    .catch(err => console.log(err));


const User = sequelize.import('./models/user');
const UserReview = sequelize.import('./models/userReview');
const Title = sequelize.import('./models/title');
const Category = sequelize.import('./models/category');
const Media = sequelize.import('./models/media');
const Edition = sequelize.import('./models/edition');
const AmazonLink = sequelize.import('./models/amazonLink');


User.hasMany(UserReview, {
    foreignKey: 'userID',
    sourceKey: 'userID',
    as: 'usersReviews'
  });
UserReview.belongsTo(User, {
    foreignKey: 'userID',
    sourceKey: 'userID',
    as: 'reviewsUsers'
  });


  Title.hasMany(UserReview, {
    foreignKey: 'titleID',
    sourceKey: 'titleID',
    as: 'titlesReviews'
    });
UserReview.belongsTo(Title, {
    foreignKey: 'titleID',
    sourceKey: 'titleID',
    as: 'reviewsTitles'
    });


Category.hasMany(Title, {
    foreignKey: 'categoryID',
    sourceKey: 'categoryID',
    as: 'categoryTitles'
    });
Title.belongsTo(Category, {
    foreignKey: 'categoryID',
    sourceKey: 'categoryID',
    as: 'titlesCategories'
    });


Title.hasMany(Edition, {
    foreignKey: 'titleID',
    sourceKey: 'titleID',
    as: 'titlesEditions'
  });
  Edition.belongsTo(Title, {
    foreignKey: 'titleID',
    sourceKey: 'titleID',
    as: 'editionsTitles'
  });


  Media.hasMany(Edition, {
    foreignKey: 'mediaID',
    sourceKey: 'mediaID',
    as: 'mediaEditions'
  });
  Edition.belongsTo(Media, {
    foreignKey: 'mediaID',
    sourceKey: 'mediaID',
    as: 'editionsMedia'
  });


  AmazonLink.hasMany(Edition, {
    foreignKey: 'amazonLinkID',
    sourceKey: 'amazonLinkID',
    as: 'amazonLinksEditions'
  });
  Edition.belongsTo(AmazonLink, {
    foreignKey: 'amazonLinkID',
    sourceKey: 'amazonLinkID',
    as: 'editionsAmazonLinks'
  });


module.exports = sequelize;