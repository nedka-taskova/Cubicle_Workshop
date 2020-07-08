// TODO: Require Controllers...
const { Router } = require('express')
const { getAccessories, attachedAccessories } = require('../controllers/accessories')
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

const router = Router();

router.get('/', async (req, res) => {
    const cubes = await getAllCubes()

    res.render('index', {
        title: 'Cube Workshop',
        cubes
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
})

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory'
    })
})

router.post('/create/accessory', async(req, res) => {
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

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAccessories();
    
    const data = await attachedAccessories(cube._id)

    const canAttachAccessory = cube.accessories.length !== accessories.length &&  accessories.length > 0 

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        id: req.params.id,
        ...cube,
        accessories,
        canAttachAccessory
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    const{
        accessory
    } = req.body
    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router