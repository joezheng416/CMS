const CourseModel = require("../models/course");
const StudentModel = require("../models/student");
const {addCourseSchema} = require("../validations/course");

const addCourse = async(req, res) => {
    // const schema = Joi.object({
    //     name: Joi.string().min(2).max(10).required(),
    //     code: Joi.string().regex(/^[a-zA-Z]+[0-9]+$/).message("invalid course code"),
    //     description: Joi.string(),
    // })
    const validBody = await addCourseSchema.validateAsync(req.body);
    console.log("add Course");
    //data validation
    const course = new CourseModel(validBody);
    await course.save();
    res.status(201).json(course);

};
const getAllCourse = async (req, res) => {
    const courses = await CourseModel.find().exec();
    //error handling missing
    console.log("get all Courses");
    res.json(courses);
};
const getCourseById = async(req, res) => {
    const {id} = req.params;
    const course = await CourseModel.findById(id).populate("students").exec();
    if(!course){
        res.status(404).json({"error":"Course not found"})
        return;
    }
    res.json(course);

};
const updateCourseById = async(req, res) => {
    const {id} = req.params;
    const {description,name} = req.body;
    const course = await CourseModel.findByIdAndUpdate(
        id,
        {description,name},
        {new: true}
    ).exec();
    if(!course){
        res.status(404).json({"error":"Course not found"})
        return;
    }
    res.json(course);
    

};
const deleteCourseById = async(req, res) => {
    const {id} = req.params;
    const course = await CourseModel.findByIdAndDelete(id);
    if(!course){
        res.status(404).json({"error":"Course not found"})
        return;
    }
    await StudentModel.updateMany(
        {
            courses:id 
        },
        {
            $pull: {
                courses: id
            }
        }
    ).exec();
    res.sendStatus(204);
};

module.exports = {
    addCourse,
    getAllCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
}
