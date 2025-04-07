import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";

class NegotiationService{
    async getAll(){
        return prismaClient.negociacion.findMany({
            include:{
                usuario: true,
                cliente: true, 
                estado: true,
                productos: true
            }
        });
    }
    async getById(negotiationId:number){
        return prismaClient.negociacion.findUnique({
            where:{id:negotiationId}
        });
    }
    async create(newProductData:Prisma.NegociacionUncheckedCreateInput){
        return prismaClient.negociacion.create({
            data:newProductData
        });
    }
    async delete(negotiationId:number){
        return prismaClient.negociacion.delete({
            where:{id:negotiationId}
        });
    }
    async update(negotiationId:number, newProductData:Prisma.NegociacionUncheckedUpdateInput){
        return prismaClient.negociacion.update({
            where:{id:negotiationId},
            data:newProductData
        });
    }
}

const singleNegotiationService = new NegotiationService();

export {NegotiationService, singleNegotiationService}; // Tener el tipo disponible en controller
export default singleNegotiationService; // Solo una instancia necesaria. Aunque el controlador solo requiera hacer una instancia, es preferible tener una sola controlada desde el archivo de la clase. 