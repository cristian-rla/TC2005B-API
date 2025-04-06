import { Prisma } from "@prisma/client";
import {AuthService} from "../db/auth.ts"

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
        if(!await this.service.verifyLogin(loginData)){
            throw (new Error("No se encontró el email"))
        }
        return true;
    }
}

export default AuthController;