const database = require("../controllers/database");

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        // databaseUrl: 'mongodb+srv://user:softuni-password@softuniworkshop.ixfre.mongodb.net/cubicle'
        databaseUrl: `mongodb+srv://user:${process.env.DB_PASSWORD}@softuniworkshop.ixfre.mongodb.net/cubicle`
    },
    production: {}
};