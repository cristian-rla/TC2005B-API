import {AuthService} from "../db/auth"
import { Prisma } from "@prisma/client";

class AuthController{
    service:AuthService;
    constructor(service:AuthService){
        this.service=service;
    }
    async createUser(userData:Prisma.UsuarioUncheckedCreateInput){
        if(await this.service.findEmail(userData.email)){
            throw(new Error("Email already has an associated account"));
        }
        this.service.create(userData);
    }
    async verify(){
    
    }
}

export default AuthController;