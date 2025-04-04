import express from 'express'
import UserHandler from '../handlers/user'

const UserRouter = express.Router();

UserRouter.post("/", UserHandler.addUser);