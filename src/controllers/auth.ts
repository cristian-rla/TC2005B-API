import {AuthService} from "../db/auth"
import { Prisma } from "@prisma/client";

class AuthController{
    service:AuthService;
    constuctor(service:AuthService){
        this.service=service;
    }
    async createUser(userData:Prisma.UsuarioCreateInput){
        if(await this.service.findEmail(userData.email)){
            throw(new Error("Email already has an associated account"));
        }
        this.service.createUser(userData);
    }
}