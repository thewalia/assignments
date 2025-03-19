const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers

    if (!(username && password)) {
        return res.status(400).send("Username and Password Required")
    }

    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).send('User not found')
        }

        if (user.password === password) {
            return next()
        }
        else {
            return res.status(401).send("Invalid Credentials")
        }
    
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = userMiddleware;