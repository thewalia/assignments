const jwt = require("jsonwebtoken");
const jwtPassword = require("../config");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const authString = req.headers.authorization
    if (!authString)
        return res.status(403).send("Not Authorized");
    const token = authString.split(' ')[1]

    try {
        const decoded = jwt.verify(token, jwtPassword)
        if (!decoded)
            return res.status(403).send("Not Authorised")
        return next()
    }
    catch(error) {
        console.error(error);
        return res.status(500).send('Internal Server Error')
    }
}

module.exports = adminMiddleware;