import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";

class NegotiationService{
    async getAll(){
        return prismaClient.negociacion.findMany();
    }
}

const singleNegotiationService = new NegotiationService();

export {NegotiationService, singleNegotiationService}; // Tener el tipo disponible en controller
export default singleNegotiationService; // Solo una instancia necesaria. Aunque el controlador solo requiera hacer una instancia, es preferible tener una sola controlada desde el archivo de la clase. 