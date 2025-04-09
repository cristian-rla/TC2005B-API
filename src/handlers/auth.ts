import {Request, Response, NextFunction} from 'express'

import AuthController from "../controllers/auth"
import authService from "../db/auth"

const authController = new AuthController(authService);

class AuthHandler{
    async logIn(req:Request, res:Response, next:NextFunction){
        try{
            if (!await authController.verifyEmail(req.body)){
                throw (new Error("La cuenta no existe"))
            }
            res.status(200).json({message: "Se ha iniciado sesión"})
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }

    async signUp(req:Request, res:Response, next:NextFunction){
        try{
            authController.createUser(req.body);
            res.status(201).json({ message: "El usuario fue creado correctamente"});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }  
    }
}

export default new AuthHandler();