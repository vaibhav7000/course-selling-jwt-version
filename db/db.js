const mongoose = require("mongoose");


async function connection(connection_url) {
    try {
        const response = await mongoose.connect(connection_url);
        console.log("successfull connection")
        // console.log(response); long mongoose connection object
    } catch(err) {
        console.log("error occured connecting with the database");
        process.exist(1); // 1 for me is the indication that there is connection problem with database which I can see
    }
}

// making adminSchema
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const Admin = mongoose.model('Admin', adminSchema);

// making userSchema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = mongoose.model('User', userSchema);

// making courseSchema
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    owner: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Admin'
    }
}) // Valid Mongoose types are: String, Number, Date, Boolean, Buffer, ObjectId, etc.

const Course = mongoose.model('Course', courseSchema);

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true
    }
})

// enrollment model
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);





module.exports = {
    connection,
    Admin,
    User,
    Course,
    Enrollment
}