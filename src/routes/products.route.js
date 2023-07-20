import { Router } from "express";
import { createProduct, getAllProducts , getProductById , updateProduct , deleteProduct } from "../controllers/products.controller.js";
import { addLogger } from "../config/logger.js";
import { checkAdmin } from "../config/passport.config.js";

const router = Router();

router.use(addLogger);

router.post('/products', checkAdmin, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', checkAdmin, updateProduct);
router.delete('/products/:id', checkAdmin, deleteProduct);

export default router