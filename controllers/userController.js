const { User, Course, Enrollment } = require("../db/db.js");
const { jwtSecret } = require("../constants.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

async function addUserToDatabase(req, res,  next) {
    const username = req.body.username;
    const password = req.body.password;

    const dbUser = new User({
        username, password
    })

    try {
        const response = await dbUser.save();

        res.status(201).json({
            msg: "User added to the database",
            user: response
        })
    } catch(err) {
        next(err);
    }
}

function provideJWT(req, res, next) {
    const username = req.headers["username"];
    const id = req.id;

    const token = jwt.sign(JSON.stringify({
        username, id
    }), jwtSecret);

    res.status(200).json({
        token: `Bearer ${token}`,
    })
}

async function gerAllCourses(req, res, next){
    try {
        const response = await Course.find()  // or Course.find({}) both provides same result // all the documents will be returned 

        res.status(200).json({
            allCourses: response
        })
    } catch(err) {
        next(err);
    }
}


async function purchaseCourse(req, res, next) {
    const courseId = req.params.courseId;
    const userId = req.id;

    if(!mongoose.Types.ObjectId.isValid(courseId)) {
        res.status(403).json({
            msg: "Invalid course id",
        })
        return
    }

    // 1st find is there any course with this id
    try {
        const response = await Course.findById(courseId);

        if(!response) {
            res.status(403).json({
                msg: "Invalid course id",
            })
            return
        }

        // course exists
        // => making an entry in the enrollment collection
        const purchasedCourse = new Enrollment({
            user: userId,
            course: courseId
        })

        try {
            const response = await purchasedCourse.save();

            res.status(200).json({
                msg: "Course purchased"
            })
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addUserToDatabase,
    provideJWT,
    gerAllCourses,
    purchaseCourse
}