import { Prisma } from "@prisma/client";
import {NegotiationService} from "../db/negotiation.ts"

class NegotiationController{
    service:NegotiationService;

    constructor(service:NegotiationService){
        this.service = service;
    }
    async getAllNegotiations(){
        return await this.service.getAll();
    }
    async getAllNegotiationsBystates(){
        const negotiations = await this.service.getAll();
        const negotiationsByState:(Prisma.NegociacionUncheckedCreateInput[])[] = [[],[],[],[]];
        for(const neg of negotiations){
            negotiationsByState[neg.idEstado].push(neg);
        }
        return negotiationsByState;
    }
    async getNegotiationById(id:number){
        return await this.service.getById(id);
    }
    async addNegotiation(negotiationData:Prisma.NegociacionUncheckedCreateInput){
        return await this.service.create(negotiationData);
    }
    async deleteNegotiation(id:number){
        return await this.service.delete(id);
    }
    async updateNegotiation(id:number, newData:Prisma.NegociacionUncheckedUpdateInput){
        return await this.service.update(id, newData);
    }
}

export default NegotiationController;