import { NegotiationService } from "../db/negotiation"
import { negotiationSchema } from "../schemas/negotiationSchema";
import { singleClientService } from "../db/client";
import singleUserService from "../db/user";
import { singleProductService } from "../db/product"
import { z } from "zod";
import { productSchema } from "../schemas/productSchema";

type Product = z.infer<typeof productSchema>
type Negotiation = z.infer<typeof negotiationSchema>

class NegotiationController{
    service:NegotiationService;

    constructor(service:NegotiationService){
        this.service = service;
    }
    async getAllNegotiations(){
        return await this.service.getAll();
    }
    async getNegotiationById(id:number){
        return await this.service.getById(id);
    }
    async addNegotiation(sentNegotiationData:unknown, products:{cantidad:number, productData:Product}[]){ // Puedo utilizar z.array aquí.
        const negotiationData = negotiationSchema.safeParse(sentNegotiationData);
        if (!negotiationData.success)
            throw new Error("Los datos no van acorde al schema");

        const client = await singleClientService.getById(negotiationData.data.idClientes);
        if (!client) throw new Error(`El cliente de id ${negotiationData.data.idClientes} no existe`);
        
        const user = await singleUserService.getById(negotiationData.data.idUsuarios);
        if (!user) throw new Error(`El usuario de id ${negotiationData.data.idUsuarios} no existe`);

        const newNegotiation = await this.service.create(negotiationData.data);

        const product = await Promise.all(
            products.map(
                async ({cantidad, productData}) =>  this.service.createProductRelations({idNegociacion:newNegotiation.id, idProducto:productData.id, cantidad:cantidad, subtotal:cantidad*productData.precio})
            ))
            
        return newNegotiation;
    }
    async deleteNegotiation(id:number){
        return await this.service.delete(id);
    }
    async updateNegotiation(id:number, sentNegotiationData:unknown){  
        const negotiationData = negotiationSchema.safeParse(sentNegotiationData);
        if(!negotiationData.success)
            throw new Error("Los datos no van acorde al schema");

        const client = await singleClientService.getById(negotiationData.data.idClientes);
        if (!client) throw new Error(`El cliente de id ${negotiationData.data.idClientes} no existe`);
        
        const user = await singleUserService.getById(negotiationData.data.idUsuarios);
        if (!user) throw new Error(`El usuario de id ${negotiationData.data.idUsuarios} no existe`);

        return await this.service.update(id, negotiationData.data);
    }
}

export default NegotiationController;