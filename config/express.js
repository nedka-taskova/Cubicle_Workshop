const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    //add and setup view engine
    app.engine('hbs', handlebars({
        extname: '.hbs'
    }))

    app.set('view engine', '.hbs')

    //setup path to static files
    app.use('/static', express.static('static'))
};