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

        if(await this.service.getByEmail(parsed.data.correo)){
            throw(new Error("Ya hay un cliente asociado a esta cuenta"));
        }

        const {empresa, ...newClientData} = parsed.data;

        let enterpriseData = await singleEnterpriseService.getByName(empresa);
        if(!enterpriseData){
            enterpriseData = await singleEnterpriseService.create({nombre:empresa});
        }

        return await this.service.create({idEmpresa:enterpriseData.id, ...newClientData});
    }

    async updateClient(id:number, clientData:unknown){
        const parsed = ClientSchema.safeParse(clientData);
        if(!parsed.success){
            throw (new Error("Los datos proporcionados no van acorde al schema"));
        }

        const currentClient = await this.service.getById(id);
        if(!currentClient){
            throw(new Error("No hay cliente asociado a este id"));
        }

        let enterpriseData = await singleEnterpriseService.getById(currentClient.idEmpresa);
        if(!enterpriseData){
            enterpriseData = await singleEnterpriseService.create({nombre:parsed.data.empresa});
        }

        return await this.service.update(id, {idEmpresa:enterpriseData.id, ...parsed.data});
    }

    async deleteClient(id:number){
        
        return await this.service.delete(id);
    }
}

export default ClientController;