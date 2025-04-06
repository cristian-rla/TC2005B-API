import {Request, Response, NextFunction} from 'express'
import ClientController from '../controllers/client'
import clientService from "../db/client"

const clientController = new ClientController(clientService);

class ClientHandler{
    async getAllClients(req:Request, res:Response, next:NextFunction){
        try{
            const clients = await clientController.getAllClients();
            res.status(200).json(clients);
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
    async getClientById(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.getClientById(Number(req.params.id));
            res.status(200).json(client);
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
    async postClient(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.addClient(req.body);
            res.status(200).json({ message:"El cliente fue agregado exitosamente"});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
    async putClient(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.updateClient(Number(req.params.id), req.body);
            res.status(200).json({ message:"El cliente fue actualizado exitosamente"});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
    async deleteClient(req:Request, res:Response, next:NextFunction){
        try{
            const client = await clientController.deleteClient(Number(req.params.id));
            res.status(200).json({message:"El cliente fue eliminado exitosamente"});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
}

export default new ClientHandler();