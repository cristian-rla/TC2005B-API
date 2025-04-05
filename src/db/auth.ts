import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";

class AuthService{
    async findEmail(email:string){
        return prismaClient.usuario.findFirst({
            where:{email:email}
        });
    }
}

const singleAuthService = new AuthService();

export {AuthService, singleAuthService}
export default singleAuthService;