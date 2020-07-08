const { Router } = require('express')
const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user')

const router = Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('loginPage', {
        title: 'Login | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/login',  async (req, res) => {

    const status = await verifyUser(req, res)
    
    if(status){
        return res.redirect('/')
    }
    
    res.redirect('/')
})

router.get('/signup', guestAccess, getUserStatus, (req, res) => {
    res.render('registerPage', {
        title: 'Register | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/signup',  async (req, res) => {

    const status = await saveUser(req, res)
    
    if(status){
        return res.redirect('/')
    }
    
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    res.render('registerPage')
})

module.exports = router