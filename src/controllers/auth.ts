/*
Los tipos de datos, aunque sea conveniente obtenerlos de Prisma, es pertinente especificarlos en los schemas.

*/
import { Prisma } from "@prisma/client";
import {AuthService} from "../db/auth"

interface LoginData{
    email:string,
    password:string
}

class AuthController{
    service:AuthService;
    constructor(service:AuthService){
        this.service=service;
    }
    async createUser(userData:Prisma.UsuarioUncheckedCreateInput){
        if(await this.service.findEmail(userData.email)){
            throw(new Error("Este email ya tiene una cuenta asociada"));
        }
        this.service.create(userData);
    }
    async verifyEmail(loginData:LoginData){
        return await this.service.verifyLogin(loginData);
    }
}

export default AuthController;