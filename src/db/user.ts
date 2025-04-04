import prisma from "./prisma";
import { Prisma } from "@prisma/client";

class UserService{
    async findEmail(email:string){
        return await prisma.cliente.findFirst({where:{correo:email}});
    }

    async createUser(userData:Prisma.UsuarioCreateInput){
        const user = await prisma.usuario.create({
            data: userData // NO se especifica con prisma el id, se indica en el objeto tipo empresa que está relacionado a cliente
        });
    }
    /* // Esto va en client
    async findEnterprise(enterprise:string){
        return await prisma.empresa.findFirst({where:{nombre:enterprise}});
    }
    */
}

const singleUserService = new UserService();

export default singleUserService;
export {singleUserService, UserService};