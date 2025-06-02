const { Course } = require("../db/db.js");

async function addAdminCourseToDatabase(req, res){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const course = new Course({
        title, description, price, imageLink
    })

    // saving to the databse
    try {
        const response = await course.save();

        res.status(201).json({
            msg: "Course added to the databse",
            response
        })
    } catch(err) {
        next(err);
    }
}

module.exports = {
    addAdminCourseToDatabase
}