import express from 'express'
import UserHandler from '../handlers/user.ts'

const UserRouter = express.Router();

UserRouter.post("/", UserHandler.addUser); // Tengo dudas en esto. Porque ya tendremos un authSignup, entonces este endpoint es innecesario
