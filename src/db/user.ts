import prisma from "./prisma";
import { Prisma } from "@prisma/client";

class UserService{
    async findEmail(email:string){ // No se puede utilizar findUnique porque el parámetro de búsqueda no es un identificador único
        return await prisma.cliente.findFirst({where:{correo:email}});
    }
    async createUser(userData:Prisma.UsuarioUncheckedCreateInput){
        const user = await prisma.usuario.create({
            data: userData // NO se especifica con prisma el id, se indica en el objeto tipo empresa que está relacionado a cliente
        });
    }
}

const singleUserService = new UserService();

export default singleUserService;
export {singleUserService, UserService};