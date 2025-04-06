import {Request, Response, NextFunction} from 'express'

import AuthController from "../controllers/auth"
import authService from "../db/auth"

const authController = new AuthController(authService);

class AuthHandler{
    async logIn(req:Request, res:Response, next:NextFunction){
        if (!await authController.verifyEmail(req.body)){
            throw (new Error("La cuenta ya existe"))
        }
    }

    async signUp(req:Request, res:Response, next:NextFunction){
        try{
            authController.createUser(req.body);
            res.status(201).json({ message: "El usuario fue creado correctamente"});
        } catch(error){
            res.status(404).json({ message: "Error en la creación del usuario" });
            //next(error);
        }    
    }
}

export default new AuthHandler();