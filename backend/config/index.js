require('dotenv').config({path: './routes/.env'});

module.exports = {
    DB: process.env.APP_DB,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY  
}