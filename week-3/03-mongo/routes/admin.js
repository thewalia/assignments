const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup
    const {username, password} = req.body

    if (!(username && password))
        return res.status(400).send("Username and Password Required")

    try {
        const newAdmin = new Admin({username, password})
        await newAdmin.save()
        res.status(201).json({message: 'Admin created successfully'})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
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