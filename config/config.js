
module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: `CUBE-WORKSHOP-SOFTUNI`,
        // databaseUrl: 'mongodb+srv://user:softuni-password@softuniworkshop.ixfre.mongodb.net/cubicle'
        databaseUrl: `mongodb+srv://user:${process.env.DB_PASSWORD}@softuniworkshop.ixfre.mongodb.net/cubicle`
    },
    production: {}
};