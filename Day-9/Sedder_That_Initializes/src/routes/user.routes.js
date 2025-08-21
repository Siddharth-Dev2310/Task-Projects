import { Router } from "express";
import { createUser, sedderSuperAdminCreated, loginUser } from "../controller/user.controller.js";


const router = Router();

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/seeder-function").post(sedderSuperAdminCreated);

export default router