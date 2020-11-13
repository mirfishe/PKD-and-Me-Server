require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/user-controller');
const userReview = require('./controllers/userReview-controller');
const title = require('./controllers/title-controller');
const edition = require('./controllers/edition-controller');
const media = require('./controllers/media-controller');
const category = require('./controllers/category-controller');

// const error = require('./controllers/error-controller');

sequelize.sync();

// Forces the database to drop the tables and create them with the new models
// https://bezkoder.com/sequelize-associate-one-to-many/
// sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', user);
app.use('/userreview', userReview);
app.use('/title', title);
app.use('/edition', edition);
app.use('/media', media);
app.use('/category', category);

// app.use('/error', error);



app.listen(process.env.PORT || 4000, function() { 
  console.log(`App is listening on port ${process.env.PORT}`);
}
);
