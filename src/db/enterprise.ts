import prismaClient from "./prisma";
import { Prisma } from "@prisma/client";

class EnterpriseService{
    async getAll(){
        return await prismaClient.empresa.findMany();
    }
    async getByName(enterpriseName:string){
        return await prismaClient.empresa.findFirst({
            where:{nombre:enterpriseName}
        })
    }
    async getById(enterpriseId:number){
        return await prismaClient.empresa.findUnique({
            where:{id:enterpriseId}
        });
    }
    async create(enterprise:Prisma.EmpresaUncheckedCreateInput){
        return await prismaClient.empresa.create({
            data:enterprise
        })
    }
    /*
    async getByQuery(query:typeof EnterpriseSchemaQuery){
        const validatedQuery = EnterpriseSchemaQuery.parse(query);

        if(Object.values(query).every(att => att === null)){
            return prismaClient.empresa.findMany();
        }

        const prismaFilter: any = {};

        if (validatedQuery.nombre) {
            prismaFilter.nombre = { contains: validatedQuery.nombre, mode: "insensitive" };
        }

        if (validatedQuery.industria) {
            prismaFilter.industria = { contains: validatedQuery.industria, mode: "insensitive" };
        }

        if (validatedQuery.foto) {
            prismaFilter.foto = validatedQuery.foto;
        }

        return prismaClient.empresa.findMany({
            where: prismaFilter,
        });
    
    }
    */
}

export const singleEnterpriseService = new EnterpriseService();

