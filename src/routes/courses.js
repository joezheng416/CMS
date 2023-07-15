const {Router} = require("express");
const { getAllCourse, getCourseById, addCourse, updateCourseById, deleteCourseById } = require("../controllers/courses");

const courseRouter = Router();

courseRouter.get("",getAllCourse);
courseRouter.get("/:id",getCourseById);
courseRouter.post("",addCourse);
courseRouter.put("/:id",updateCourseById);
courseRouter.delete("/:id",deleteCourseById);

module.exports = courseRouter;
