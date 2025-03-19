const jwt = require("jsonwebtoken");
const jwtPassword = require("../config");

function userMiddleware(req, res, next) {
    const authString = req.headers.authorization

    if (!authString)
        return res.status(403).send("Not Authorized");

    const token = authString.split(' ')[1]

    try {
        const decoded = jwt.verify(token, jwtPassword)
        if (!decoded)
            return res.status(403).send("Not Authorised")
        req.username = decoded.username
        return next()
    }
    catch(error) {
        console.error(error);
        return res.status(500).send('Internal Server Error')
    }
}

module.exports = userMiddleware;