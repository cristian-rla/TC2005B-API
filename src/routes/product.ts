import express from 'express'
import handler from "../handlers/product"

const router = express.Router();

router.get("/", handler.getAll);

export default router;
