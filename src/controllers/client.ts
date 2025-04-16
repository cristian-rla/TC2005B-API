import { z } from "zod";
import { ClientService } from "../db/client"
import { singleEnterpriseService } from "../db/enterprise";
import { clientSchema } from "../schemas/clientSchema";

type Client = z.infer<typeof clientSchema>;

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

    async addClient(clientData:Client){
        if(await this.service.getByEmail(clientData.correo)){
            throw(new Error("Ya hay un cliente asociado a esta cuenta"));
        }

        const {empresa, ...newClientData} = clientData;

        let enterpriseData = await singleEnterpriseService.getByName(empresa);
        if(!enterpriseData){
            throw new Error("No existe tal empresa");
        }

        return await this.service.create({idEmpresa:enterpriseData.id, ...newClientData});
    }

    async updateClient(id:number, clientData:Client){
        const currentClient = await this.service.getById(id);
        if(!currentClient){
            throw(new Error("No hay cliente asociado a este id"));
        }

        let enterpriseData = await singleEnterpriseService.getById(currentClient.idEmpresa);
        if(!enterpriseData){
            enterpriseData = await singleEnterpriseService.create({nombre:clientData.empresa});
        }

        return await this.service.update(id, {idEmpresa:enterpriseData.id, ...clientData});
    }

    async deleteClient(id:number){
        
        return await this.service.delete(id);
    }
}

export default ClientController;