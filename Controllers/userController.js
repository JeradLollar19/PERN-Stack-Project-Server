require('dotenv').config();
const router = require('express').Router();
const User = require('../db').import('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/create', (req, res) => {
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 })

            res.json({
                user: user,
                message: 'User has been created!',
                sessionToken: token
            })

        },
        createError = err => res.send(500, err)
    )
});


router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.user.username,
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password,(err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
                            { expiresIn: 60 * 60 * 24 })
                        res.json({
                            user: user,
                            message: 'Successfully Authenicated User!',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: 'Bad Gateway...' })
                    }
                })
            } else {
                res.status(500).send({ error: 'Failed to Authenticate...' })
            }
        }
    )
    .catch(err => res.status(501).send({ error: 'Failed to process...' }))
})









module.exports = router;