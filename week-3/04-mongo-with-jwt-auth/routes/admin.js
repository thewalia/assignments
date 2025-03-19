const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const argon2 = require("argon2")
const jwt = require('jsonwebtoken');
const jwtPassword = require("../config");


// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup
    const {username, password} = req.body

    if (!(username && password))
        return res.status(400).send("Username and Password Required")

    try {
        const hash = await argon2.hash(password)
        const newAdmin = new Admin({username, password: hash})
        await newAdmin.save()
        res.status(201).json({message: 'Admin created successfully'})

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

        const adminUser = await Admin.findOne({ username })
        if (!adminUser) {
            return res.status(404).send('User not found')
        }
        // Verify the password

        if (await argon2.verify(adminUser.password, password)) {
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

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const { title, description, imageLink, price } = req.body

    if (!(title && description && imageLink && price)) {
        return res.status(400).send("More information required for the course")
    }

    try {
        const newCourse = new Course({title, description, imageLink, price})
        const savedCourse = await newCourse.save()
        res.status(201).json({ message: 'Course created successfully', courseId: savedCourse._id})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    try {
        const allCourses = await Course.find()
        res.status(200).json({courses: allCourses})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

module.exports = router;