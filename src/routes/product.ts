import express from 'express'
import ProductHandler from "../handlers/product"

const router = express.Router();

router.get("/", ProductHandler.getAll);
// router.post("/", ProductHandler.postProduct);
export default router;
