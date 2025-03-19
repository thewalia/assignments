const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers

    if (!(username && password)) {
        return res.status(400).send("Username and Password Required")
    }

    try {
        const adminUser = await Admin.findOne({ username })

        if (!adminUser) {
            return res.status(404).send('User not found')
        }

        if (adminUser.password === password) {
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

module.exports = adminMiddleware;