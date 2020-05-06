const jwt = require('jsonwebtoken');
const User = require('../db').import('../Models/user');


const validateSession = (req, res, next) => {
    const token = req.headers.authorization
    console.log("token", token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("decodedToken", decoded);
        if (!err && decoded){
            User.findOne({
                where:{
                    id: decoded.id
                }
            })
            .then(user => {
                console.log("user", user);
                if(!user) throw 'err'
                req.user = user

                return next()
            })
            .catch(err => next(err))
        } else {
            req.error = err
            return res.status(500).send('Not Authorized')
        }
    })
}


module.exports = validateSession;