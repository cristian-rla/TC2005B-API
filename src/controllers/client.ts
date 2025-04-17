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

    async addClient(sentClientData:unknown){
        const clientData = clientSchema.safeParse(sentClientData);
        if (!clientData.success)
            throw new Error("Los datos no van acorde al schema");

        // Imposible crear la cuenta si el cliente ya tiene un correo asociado.
        if(await this.service.getByEmail(clientData.data.correo)){
            throw(new Error("Ya hay un cliente asociado a esta cuenta"));
        }

        // En este caso, desde el frontend se nos otorga el id de la empresa porque se elige de un grupo de empresas desplegadas ya aceptadas por un administrador
        // por ende, debería existir. Aún así, se agrega la comprobación con este query. DIALOGAR LA POSIBILIDAD DE ACEPTAR UNA EMPRESA NUEVA para el método de post client.
        let enterpriseData = await singleEnterpriseService.getById(clientData.data.idEmpresa);
        if(!enterpriseData){
            throw new Error("No existe tal empresa");
        }

        return await this.service.create(clientData.data);
    }

    async updateClient(id:number, sentClientData:unknown){
        const clientData = clientSchema.safeParse(sentClientData);
        if (!clientData.success)
            throw new Error("Los datos no van acorde al schema")

        // Se comprueba que sí existe el cliente. Sí debería existir, porque desde el frontend ya se tienen los id de los clientes.
        // Aún así, se realiza la comprobación
        const currentClient = await this.service.getById(id);
        if(!currentClient)
            throw(new Error("No hay cliente asociado a este id"));

        // De nuevo, la empresa debería existir, pero se comprueba igual. 
        let enterpriseData = await singleEnterpriseService.getById(currentClient.idEmpresa);
        if(!enterpriseData) // No se realiza nada si no existe la empresa. Primero se crea la empresa, luego se crea el cliente, no las dos al mismo tiempo.
            throw new Error(`La empresa bajo el id ${currentClient.idEmpresa} no existe`);
        

        return await this.service.update(id, clientData.data);
    }

    async deleteClient(id:number){
        
        return await this.service.delete(id);
    }
}

export default ClientController;