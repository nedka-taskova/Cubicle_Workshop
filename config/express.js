const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(cookieParser())
    //add and setup view engine
    app.engine('hbs', handlebars({
        extname: '.hbs'
    }))

    app.set('view engine', '.hbs')

    //setup path to static files
    app.use('/static', express.static('static'))
};