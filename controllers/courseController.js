const { Course } = require("../db/db.js");

async function addAdminCourseToDatabase(req, res, next){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const id = req.id;


    const course = new Course({
        title, description, price, imageLink,
        owner: id // if dealing with mongoose we can directly pass string that represents the objectID or convert it into objectID using mongoose.types.objectiD(id)
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