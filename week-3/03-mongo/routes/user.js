const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username, password} = req.body

    if (!(username && password))
        return res.status(400).send("Username and Password Required")

    try {
        const newUser = new User({username, password})
        await newUser.save()
        res.status(201).json({message: 'User created successfully'})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    try {
        const allCourses = await Course.find()
        res.status(200).json({courses: allCourses})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const {courseId} = req.params
    const {username} = req.headers
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
    // Implement fetching purchased courses logic
    const {username} = req.headers
    try {
        const courseList = await User.findOne({username}, 'purchasedCourses').populate('purchasedCourses').exec()
        res.status(200).json({purchasedCourses: courseList.purchasedCourses})
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }    
});

module.exports = router