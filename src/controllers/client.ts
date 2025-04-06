import { Prisma } from "@prisma/client";
import {ClientService} from "../db/client"
import { singleEnterpriseService } from "../db/enterprise";
import { ClientSchema } from "../schemas/clientSchema";

class ClientController{
    service:ClientService;
    constructor(service:ClientService){
        this.service= service;
    }

    async getAllClients(){
        return await this.service.getAll();
    }

    async getClientById(id:number){
        return await this.service.getById(id);
    }

    async addClient(clientData:unknown){
        // Este safe parse puede ser cambiado a handler layer
        const parsed = ClientSchema.safeParse(clientData);
        if (!parsed.success){
            throw(new Error("Los datos proporcionados no van acorde al esquema"))
        }
        
        const {empresa, ...newClientData} = parsed.data;

        let enterpriseData = singleEnterpriseService.getByName(empresa);
        if(!enterpriseData){
            enterpriseData = singleEnterpriseService.create({nombre:empresa});
        }

        return await this.service.create({idEmpresa:enterpriseData.id, ...newClientData});
    }

    async updateClient(id:number, clientData:Prisma.ClienteUncheckedCreateInput){
        return await this.service.update(id,clientData);
    }

    async deleteClient(id:number){
        return await this.service.delete(id);
    }
}

export default ClientController;