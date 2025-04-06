import { Prisma } from "@prisma/client";
import {ClientService} from "../db/client.ts"

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

    async addClient(clientData:Prisma.ClienteUncheckedCreateInput){
        return await this.service.create(clientData);
    }

    async updateClient(id:number, clientData:Prisma.ClienteUncheckedCreateInput){
        return await this.service.update(id,clientData);
    }
    async deleteClient(id:number){
        return await this.service.delete(id);
    }
}

export default ClientController;