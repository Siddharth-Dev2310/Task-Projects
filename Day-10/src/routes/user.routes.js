import { Router } from "express";
import { createUser, loginUser, loogedoutUser, updateUserDetails, getOrdersCountPerCustomer } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, loogedoutUser);
router.route("/update").post(verifyJWT,updateUserDetails);

router.get("/orders/count-per-customer", verifyJWT, getOrdersCountPerCustomer);

export default router;