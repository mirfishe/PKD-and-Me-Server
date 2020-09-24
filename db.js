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

    User.hasMany(List, {
            onDelete: 'cascade',
            hooks: true
    });
    List.belongsTo(User, {
            onDelete: 'cascade'
    });

    List.hasMany(Item, {
            onDelete: 'cascade',
            hooks: true
    });
    Item.belongsTo(List, {
            onDelete: 'cascade'
    });

module.exports = sequelize;