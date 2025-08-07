import { Router } from "express";
import {
    createUserOfTask,
    updateUserOfTask,
    showTheUserWithTask,
    deletedUserOfTask
} from "../controller/taskmanger.controller.js"

const router = Router();

router.route("/create-user-of-task").post(createUserOfTask);
router.route("/update-user-of-task").post(updateUserOfTask);
router.route("/read-user-of-task").post(showTheUserWithTask);
router.route("/delet-user-of-task").post(deletedUserOfTask);

export default router