const {Router} = require("express");
const { getAllStudent, getStudentById, addStudent, updateStudentById, deleteStudentById, addStudentToCourse ,removeStudentFromCourse } = require("../controllers/students");

const studentRouter = Router();

studentRouter.get("",getAllStudent);
studentRouter.get("/:id",getStudentById);
studentRouter.post("",addStudent);
studentRouter.put("/:id",updateStudentById);
studentRouter.delete("/:id",deleteStudentById);
studentRouter.post("/:studentId/courses/:courseId",addStudentToCourse);
studentRouter.delete("/:studentId/courses/:courseId",removeStudentFromCourse);

module.exports = studentRouter;
