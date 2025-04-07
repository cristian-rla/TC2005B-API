import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";

class UserService{
    async findEmail(userEmail:string){ // No se puede utilizar findUnique porque el parámetro de búsqueda no es un identificador único
        return await prismaClient.usuario.findFirst({where:{email:userEmail}});
    }
    async createUser(userData:Prisma.UsuarioUncheckedCreateInput){
        return await prismaClient.usuario.create({
            data: userData // NO se especifica con prisma el id, se indica en el objeto tipo empresa que está relacionado a cliente
        });
    }
    async getAllUsers(){
        return await prismaClient.usuario.findMany({});
    }
    async getById(userId:number){
        return await prismaClient.usuario.findUnique({
            where:{id:userId}
        })
    }
}

const singleUserService = new UserService();

export default singleUserService;
export {singleUserService, UserService};