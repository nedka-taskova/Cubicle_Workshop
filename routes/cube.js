const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]
const Cube = require('../models/cube')
const { getCubeWithAccessories } = require('../controllers/cubes')
const { Router } = require('express')
const jwt = require('jsonwebtoken')
const router = Router();

router.get('/edit', (req, res) => {
    res.render('editCubePage')
})

router.get('/delete', (req, res) => {
    res.render('deleteCubePage')
})

router.get('/create', (req, res) => {
    res.render('create',{
        title: 'Create | Cube Workshop'
    });
})

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    //take token from cookies
    const token  = req.cookies['aid']
    //decoded toekn
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