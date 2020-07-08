// TODO: Require Controllers...
const { Router } = require('express')
const { getAccessories, attachedAccessories } = require('../controllers/accessories')
const { getCube, updateCube} = require('../controllers/cubes')
const { authAccess, getUserStatus, authAccessJSON } = require('../controllers/user')
const Accessory = require('../models/accessory')

const router = Router();

router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create/accessory',  authAccessJSON, async(req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body

    const accessory = new Accessory({
        name, 
        description, 
        imageUrl
    });

    await accessory.save();

    res.redirect('/create/accessory');
})

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAccessories();
    
    const data = await attachedAccessories(cube._id)

    const canAttachAccessory = cube.accessories.length !== accessories.length &&  accessories.length > 0 

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        id: req.params.id,
        ...cube,
        accessories,
        canAttachAccessory,
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/attach/accessory/:id', authAccessJSON, async (req, res) => {
    const{
        accessory
    } = req.body
    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router