import express from 'express'
import authHandler from "../handlers/auth.ts"

const router = express.Router();

router.post("/login", authHandler.logIn);
router.post("/signup", authHandler.signUp)

export default router;
