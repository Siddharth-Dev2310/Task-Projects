import { Router } from "express";
import { createUser, sedderSuperAdminCreated, loginUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/create").post(verifyJWT, createUser);
router.route("/login").post(loginUser);
router.route("/seeder-function").post(sedderSuperAdminCreated);

export default router