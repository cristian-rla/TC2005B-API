import {Request, Response, NextFunction} from 'express'

import UserController from "../controllers/user"
import userService from "../db/user"

const userController = new UserController(userService);

class UserHttpHandler{
    async addUser(req:Request, res:Response, next:NextFunction){
        // CHECAR CON USER SCHEMA DE ZOD EL TIPO DE REQ.BODY
        try{
            userController.createUser(req.body)
            res.status(201).json("El usuario fue creado correctamente");
        } catch(error){
            res.status(500).json({ message: "Internal server error" });
            //next(error);
        }
    }
}

export default new UserHttpHandler();