import {Request, Response, NextFunction} from 'express'

import UserController from "../controllers/user"
import userService from "../db/user"

const userController = new UserController(userService);

class UserHttpHandler{
    async addUser(req:Request, res:Response, next:NextFunction){
        try{
            userController.createUser(req.body)
            res.status(201).json("El usuario fue creado correctamente");
        } catch(error){

            next(error);
        }
    }
}

export default new UserHttpHandler();