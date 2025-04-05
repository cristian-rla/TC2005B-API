import {UserService} from "../db/user"
import { Prisma } from "@prisma/client";

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