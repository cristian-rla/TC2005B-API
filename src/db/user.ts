import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";

class UserService{
    async findEmail(email:string){ // No se puede utilizar findUnique porque el parámetro de búsqueda no es un identificador único
        return await prismaClient.cliente.findFirst({where:{correo:email}});
    }
    async createUser(userData:Prisma.UsuarioUncheckedCreateInput){
        return await prismaClient.usuario.create({
            data: userData // NO se especifica con prisma el id, se indica en el objeto tipo empresa que está relacionado a cliente
        });
    }
    async getAllUsers(){
        return await prismaClient.usuario.findMany({});
    }
}

const singleUserService = new UserService();

export default singleUserService;
export {singleUserService, UserService};