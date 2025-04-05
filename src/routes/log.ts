import express from 'express'
import LogHandler from "../handlers/product"

const router = express.Router();

router.get("/", LogHandler.getAll);

// router.post("/", ProductHandler.postProduct);
export default router;
