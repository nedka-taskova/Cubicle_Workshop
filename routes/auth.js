const { Router } = require('express')

const router = Router();

router.get('/login', (req, res) => {
    console.log('login')
    res.render('loginPage')
})

router.get('/signup', (req, res) => {
    res.render('registerPage')
})

router.get('/logout', (req, res) => {
    res.render('registerPage')
})

module.exports = router