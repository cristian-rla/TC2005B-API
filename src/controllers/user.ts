import { Prisma } from "@prisma/client";
import {UserService} from "../db/user"

class UserController{
    service:UserService;
    constructor(service:UserService){
        this.service = service;
    }
    async createUser(userData:Prisma.UsuarioUncheckedCreateInput){
        if(await this.service.findEmail(userData.email)){
            throw(new Error("Email already has an associated account"));
        }
        this.service.createUser(userData);
    }
}

export default UserController;