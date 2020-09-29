require('dotenv').config();

module.exports = {
"development": {
    "username": "postgres",
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
},
"test": {
    "username": "postgres",
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
},
"production": {
    "username": "postgres",
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
}
};