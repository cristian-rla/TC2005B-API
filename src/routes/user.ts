import express from 'express'
import UserHandler from '../handlers/user'

const router = express.Router();

router.post("/", UserHandler.addUser); // Tengo dudas en esto. Porque ya tendremos un authSignup, entonces este endpoint es innecesario

export default router;