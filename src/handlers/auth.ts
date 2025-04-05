import {Request, Response, NextFunction} from 'express'

import AuthController from "../controllers/auth"
import authService from "../db/auth"

const authController = new AuthController(authService);

class AuthHandler{
    async logIn(req:Request, res:Response, next:NextFunction){
        return await authController.verifyEmail(req.body);
    }

    async signUp(req:Request, res:Response, next:NextFunction){
        try{
            authController.createUser(req.body);
            res.status(201).json("El usuario fue creado correctamente");
        } catch(error){
            res.status(500).json({ message: "Internal server error" });
            //next(error);
        }    
    }
}

export default AuthHandler;