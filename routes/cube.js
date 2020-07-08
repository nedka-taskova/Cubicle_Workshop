const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]
const Cube = require('../models/cube')
const { getCubeWithAccessories } = require('../controllers/cubes')
const { authAccess, getUserStatus, authAccessJSON } = require('../controllers/user')
const { Router } = require('express')
const jwt = require('jsonwebtoken')

const router = Router();

router.get('/edit', authAccess, getUserStatus, (req, res) => {
    res.render('editCubePage', {
        title: 'Edit | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/delete', authAccess, getUserStatus, (req, res) => {
    res.render('deleteCubePage', {
        title: 'Delete | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/create', authAccess, getUserStatus,  (req, res) => {
    res.render('create',{
        title: 'Create | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
})

router.post('/create', authAccessJSON, (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    //take token from cookies
    const token  = req.cookies['aid']
    //decoded token
    const jwtDecodedObject = jwt.verify(token, config.privateKey)

    const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel, creatorId: jwtDecodedObject.userID});

    cube.save((err) => {
        if(err){
            console.log(err)
            res.redirect('/create')
        }
        else{
            res.redirect('/');
        }
    });
})

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id) 
    
    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube
    });
})

module.exports = router