import { Router } from "express";
import { 
    createStudent,
    updateStudent, 
    deleteStudent, 
    viewAllStudent, 
    searchStudent,
    sortStudent,
    exportStudentList
 } from "../controller/user.controller.js";

const router = Router();

router.route("/ragister").post(createStudent);
router.route("/update").post(updateStudent);
router.route("/delete").post(deleteStudent);
router.route("/view-all-student").get(viewAllStudent);
router.route("/search-students").get(searchStudent);
router.route("/sort-student").get(sortStudent)
router.route("/export-student-list").get(exportStudentList)

export default router;