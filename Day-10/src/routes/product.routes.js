import { Router } from "express";
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById,getTopSellingProducts } from "../controller/prodcut.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/:username/create').post(verifyJWT, createProduct);
router.route('/:username/:productId/update').put(verifyJWT, updateProduct);
router.route('/:username/:productId/delete').delete(verifyJWT, deleteProduct)

router.route('/').get(getAllProducts),
router.route('/top-selling').get(getTopSellingProducts)

export default router;