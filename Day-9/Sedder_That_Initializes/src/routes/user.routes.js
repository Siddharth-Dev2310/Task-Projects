import { Router } from "express";
import { createUser, sedderSuperAdminCreated, loginUser, updateUserDetails } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/seeder-function").post(sedderSuperAdminCreated);
router.route("/create").post(verifyJWT, createUser);
router.route("/login").post(loginUser);
router.route("/update").post(verifyJWT, updateUserDetails);

export default router