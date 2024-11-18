const jwt = require('jsonwebtoken')

const createJWT = (res, _id) => {
    const token = jwt.sign(
        {userId: _id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        //secure: false,
        //domain: 'localhost',
        //path: '/',
        //sameSite: 'strict',
        sameSite: 'strict',
        maxAge: process.env.COOKIE_DAYS_LIFETIME * process.env.COOKIE_HOURS_LIFETIME * 60 * 60 * 1000
    })
}

module.exports = {createJWT}