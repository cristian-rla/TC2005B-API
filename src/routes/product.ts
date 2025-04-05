import express from 'express'
import productHandler from "../handlers/product"

const router = express.Router();

router.get("/", productHandler.getAll);
router.get("/:id", productHandler.getProductById);
router.post("/", productHandler.postProduct);
router.put("/:id", productHandler.updateProduct);

// router.post("/", ProductHandler.postProduct);
export default router;  
