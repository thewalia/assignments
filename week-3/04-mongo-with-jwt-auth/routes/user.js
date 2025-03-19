const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const argon2 = require("argon2")
const jwt = require('jsonwebtoken');
const jwtPassword = require("../config");


// User Routes
router.post('/signup', async(req, res) => {
    const {username, password} = req.body

    if (!(username && password))
        return res.status(400).send("Username and Password Required")

    try {
        const hash = await argon2.hash(password)
        const newUser = new User({username, password: hash})
        await newUser.save()
        res.status(201).json({message: 'User created successfully'})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

router.post('/signin', async(req, res) => {
    // Extract username and password from the request body

    const {username, password} = req.body

    if (!(username && password))
        return res.status(400).send("Username and Password Required")

    try {
        // Find the admin user by username

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).send('User not found')
        }
        // Verify the password

        if (await argon2.verify(user.password, password)) {
            // Create the JWT token

            const token = jwt.sign({username}, jwtPassword)
            res.status(200).json({token: `Bearer ${token}`})
        }
        else {
            res.status(401).send("Invalid Credentials")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
});

router.get('/courses', userMiddleware, async(req, res) => {

    try {
        const allCourses = await Course.find()
        res.status(200).json({courses: allCourses})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const {courseId} = req.params
    const {username} = req
    const user = await User.findOne({ username })

    if (user.purchasedCourses.includes(courseId)){
        return res.status(409).send('Course already purchased')
    }

    try {
        user.purchasedCourses.push(courseId)
        await user.save()
        res.status(201).json({message: 'Course purchased successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const {username} = req
    try {
        const courseList = await User.findOne({username}, 'purchasedCourses').populate('purchasedCourses').exec()
        res.status(200).json({purchasedCourses: courseList.purchasedCourses})
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    } 
});

module.exports = router