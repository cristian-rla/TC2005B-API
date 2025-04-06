import {Request, Response, NextFunction} from 'express'
import ClientController from '../controllers/client'
import clientService from "../db/client"

const clientController = new ClientController(clientService);

class ClientHandler{
    async getAllClients(req:Request, res:Response, next:NextFunction){
        try{
            const clients = await clientController.getAllClients();
            res.status(200).json(clients);
        } catch(error){
            res.status(404).json(error);
        }
    }
    async getClientById(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.getClientById(Number(req.params.id));
            res.status(200).json(client);
        } catch(error){
            res.status(404).json(error);
        }
    }
    async postClient(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.addClient(req.body);
            res.status(200).json({ message:"El cliente fue agregado exitosamente"});
        } catch(error){
            res.status(404).json(error);
        }
    }
    async putClient(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.updateClient(Number(req.params.id), req.body);
            res.status(200).json({ message:"El cliente fue actualizado exitosamente"});
        } catch(error){
            res.status(404).json(error);
        }
    }
    async deleteClient(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.deleteClient(Number(req.params.id));
            res.status(200).json({message:"El cliente fue eliminado exitosamente"});
        } catch(error){
            res.status(404).json(error);
        }
    }
}

export default new ClientHandler();