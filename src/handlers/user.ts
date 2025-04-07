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
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
}

export default new UserHttpHandler();