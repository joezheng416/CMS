const StudentModel = require("../models/student");
const CourseModel = require("../models/course");

const addStudent = async(req, res) => {
    const {firstName,lastName,email} = req.body;
    console.log("add student");
    //data validation
    const student = new StudentModel({firstName, lastName, email});
    await student.save();
    res.status(201).json(student);

};
const getAllStudent = async (req, res) => {
    const students = await StudentModel.find().exec();
    //error handling missing
    console.log("get all students");
    res.json(students);
};
const getStudentById = async(req, res) => {
    const {id} = req.params;
    const student = await StudentModel.findById(id).populate("courses").exec();
    if(!student){
        res.status(404).json({"error":"student not found"})
        return;
    }
    res.json(student);

};
const updateStudentById = async(req, res) => {
    const {id} = req.params;
    const {firstName,lastName,email} = req.body;
    const student = await StudentModel.findByIdAndUpdate(
        id,
        {firstName,lastName,email},
        {new: true}
    ).exec();
    if(!student){
        res.status(404).json({"error":"student not found"})
        return;
    }
    res.json(student);
    

};
const deleteStudentById = async(req, res) => {
    const {id} = req.params;
    const student = await StudentModel.findByIdAndDelete(id);
    if(!student){
        res.status(404).json({"error":"student not found"})
        return;
    }
    await CourseModel.updateMany(
        {
            students: id,
        },
        {
            $pull: {
                students: id,
            }
        }
    ).exec();
    res.sendStatus(204);
};

//:studentId/courses/:courseId

const addStudentToCourse = async (req,res) =>{
    const {studentId,courseId} = req.params;
    const student = await StudentModel.findById(studentId).exec();
    const course = await CourseModel.findById(courseId).exec();
    if(!student || !course){
        res.status(404).json({error:"student or course not found"});
        return;
    }
    course.students.addToSet(student._id);
    await course.save();
    const updatedStudent = await StudentModel.findByIdAndUpdate( 
        student._id,
        {$addToSet: { courses: course._id}},
        {new: true}
    ).exec();
    res.json(updatedStudent);
}

const removeStudentFromCourse = async (req,res) =>{
    const {studentId,courseId} = req.params;
    const student = await StudentModel.findById(studentId).exec();
    const course = await CourseModel.findById(courseId).exec();
    if(!student || !course){
        res.status(404).json({error:"student or course not found"});
        return;
    }
    await CourseModel.findByIdAndUpdate( 
        courseId,
        {$pull: { students: student._id}}
    ).exec();
    await StudentModel.findByIdAndUpdate( 
        studentId,
        {$pull: { courses: course._id}}
    ).exec();
    res.sendStatus(204);
    
}

module.exports = {
    addStudent,
    getAllStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    addStudentToCourse,
    removeStudentFromCourse,
}
