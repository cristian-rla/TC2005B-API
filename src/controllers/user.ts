import { UserService } from "../db/user"
import { userSchema } from "../schemas/userSchema"
import { z } from "zod";

type User = z.infer<typeof userSchema>;

class UserController{
    service:UserService;
    constructor(service:UserService){
        this.service = service;
    }
    async createUser(sentUserData:unknown){
        const parsed = userSchema.safeParse(sentUserData);
        if (!parsed.success)
            throw new Error ("Los datos no cumplen con el schema");

        if(await this.service.findEmail(parsed.data.email)){
            throw(new Error("Email already has an associated account"));
        }
        return await this.service.createUser(parsed.data);
    }
}

export default UserController;