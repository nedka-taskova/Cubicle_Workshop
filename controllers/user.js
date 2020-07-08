const env = process.env.NODE_ENV || 'development';

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/config')[env]


const generateToken = data => {
    const token = jwt.sign(data, config.privateKey)

    return token
}

const saveUser = async (req, res) => {
    const{
        username,
        password
    } = req.body
    
    const salt = await bcrypt.genSalt(10) 
    const hashedPassword = await bcrypt.hash(password, salt)            
    
    const user = new User({
        username,
        password: hashedPassword        
    })

    const userObject = await user.save()
    
    const token = generateToken(
        { 
            userID: userObject._id,
            username: userObject.username
        }
    ); 

    res.cookie('aid', token)

    return true
}

const verifyUser = async (req, res) =>{
    const{
        username,
        password
    } = req.body

    const user = await User.findOne({username})

    const status = await bcrypt.compare( password, user.password)

    if(status){

        const token = generateToken(
            { 
                userID: user._id,
                username: user.username
            }
        ); 
        res.cookie('aid', token)
    }
        
    return status
}

//middleware to check authenticated user, and redirect not logged in
const authAccess = (req, res, next) => {
    const token  = req.cookies['aid']

    if (!token) {
        return res.redirect('/');
    }
    
    try {
        const jwtDecodedObject = jwt.verify(token, config.privateKey)
        next()    
    } catch (error) {
        return res.redirect('/')
    }
}

//middleware to check authenticated user, and prevent mock post requests
const authAccessJSON = (req, res, next) => {
    const token  = req.cookies['aid']

    if (!token) {
        return res.json({
            error: 'Not authenticated'
        });
    }
    
    try {
        const jwtDecodedObject = jwt.verify(token, config.privateKey)
        next()    
    } catch (error) {
        return res.json({
            error: 'Not authenticated'
        });
    }
}

const guestAccess = (req, res, next) => {
    const token  = req.cookies['aid']

    if (token) {
        return res.redirect('/');
    }

    next()
}



const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid']
    if (!token) {
      req.isLoggedIn = false
    }
    
    try {
      jwt.verify(token, config.privateKey)
      req.isLoggedIn = true
    } catch(e) {
      req.isLoggedIn = false
    }
  
    next()
  }

module.exports={
    saveUser,
    verifyUser,
    authAccess,
    guestAccess,
    getUserStatus,
    authAccessJSON
}