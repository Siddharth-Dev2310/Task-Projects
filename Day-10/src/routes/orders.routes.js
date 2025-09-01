import { Router } from "express";
import { createOrders, deleteOrders, updateOrders, getOrderById, getMonthlySales, getAverageOrderValue } from "../controller/oders.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/:username/create').post(verifyJWT,createOrders)
router.route('/:username/:orderId/update').put(verifyJWT, updateOrders);
router.route('/:username/:orderId/delete').delete(verifyJWT, deleteOrders);

router.route('/sales/monthly').get(verifyJWT, getMonthlySales);
router.route('/average-value').get(verifyJWT, getAverageOrderValue);
router.route('/:orderId').get(verifyJWT, getOrderById);

export default router;