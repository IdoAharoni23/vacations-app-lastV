const jwt = require('jsonwebtoken')

const usersOnly = (req, res, next) =>{
    jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        (err, payload)=>{
            if (err) {
                return res.status(401).send(err)
            }
            req.user = payload
            next()
    } )
}


const adminOnly = (req, res, next) =>{
    jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        (err, payload)=>{
            if (err) {
                return res.status(401).send(err)
            }
            req.user = payload
            if (req.user.role !=="admin") {
                return res.status(401).send(`sorry ${req.user.username} but only the admin has access`)

            }
            next()
    } )
}

const login = (req, res, next) =>{
    jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        (err, payload)=>{
            if (err) {
                return res.status(401).send(err)
            }
            req.user = payload
            next()
    } )
}





module.exports = {
    usersOnly,
    adminOnly,
    login
}