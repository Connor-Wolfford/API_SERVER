require('dotenv').config()

const router = require('express').Router()
const sequelize = require('../db')
const User = sequelize.import('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//CREATE USER

router.post('/createuser', function (req, res) {
    User.create({
    email: req.body.user.email,
    username: req.body.user.username,
    password: bcrypt.hashSync(process.env.JWT_SECRET, 10)
    })
    .then(
        createSuccess = (user => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        })
    )
    .catch(err => res.send(500, err))
})

// LOGIN
router.post('/signin', (req, res) => {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err,matches) => {
                if(matches){
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message: 'Succesfully authenticated',
                        sessionToken: token
                    })
                }else{
                    res.status(502).send({error: 'bad gateway, passwords dont match'})
                }
            })
        }else{
            res.status(500).send({error: 'failed to authenticate, no user found'})
        }
    }, err => res.status(501).send({error: 'failed to process'}))
})

module.exports = router