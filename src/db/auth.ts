import { Prisma } from "@prisma/client";
import prismaClient from "./prisma.ts";

class AuthService{
    async findEmail(email:string){
        return await prismaClient.usuario.findFirst({
            where:{email:email}
        });
    }
    async create(userData:Prisma.UsuarioUncheckedCreateInput){
        return await prismaClient.usuario.create({
            data:userData
        })
    }
    async verifyLogin({email, password}:{email:string, password:string}){
        return await prismaClient.usuario.findFirst({
            where:{
                email:email,
                contraseña:password
            }
        })
    }
}

const singleAuthService = new AuthService();

export {AuthService, singleAuthService}
export default singleAuthService;