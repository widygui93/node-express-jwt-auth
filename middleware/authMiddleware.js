const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt is exists & is verified
    if(token){
        jwt.verify(token, process.env.secretJWT, ( err, decodeToken ) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodeToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.secretJWT, async ( err, decodeToken ) => {
            if(err){
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodeToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

// check whether already login or not
const notRequireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt is exists & is verified
    if(token){
        jwt.verify(token, process.env.secretJWT, ( err, decodeToken ) => {
            if(err){
                console.log(err.message);
                next();
            } else {
                console.log(decodeToken);
                res.redirect('/');
            }
        })
    } else {
        next();
    }
}

module.exports = { requireAuth, checkUser, notRequireAuth };