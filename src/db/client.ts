import { Prisma } from "@prisma/client";
import prismaClient from "./prisma"

class ClientService{
    async getAll(){
        return await prismaClient.cliente.findMany();
    }
    async getById(idClient:number){
        return await prismaClient.cliente.findUnique({
            where:{id:idClient}
        });
    }
    async getByEmail(correoCliente:string){
        return await prismaClient.cliente.findFirst({
            where:{correo:correoCliente}
        });
    }
    async create(clientData:Prisma.ClienteUncheckedCreateInput){
        return await prismaClient.cliente.create({
            data:clientData
        });
    }
    async update(idClient:number,newData:Prisma.ClienteUncheckedCreateInput){
        return await prismaClient.cliente.update({
            where:{id:idClient},
            data:newData
        })
    }
    async delete(idClient:number){
        return await prismaClient.cliente.delete({
            where:{id:idClient}
        })
    }
}

const singleClientService = new ClientService();

export {ClientService, singleClientService};
export default singleClientService;