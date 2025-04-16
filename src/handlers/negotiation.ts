import {Request, Response, NextFunction} from 'express'

import NegotationController from "../controllers/negotiation"
import negotiationService from "../db/negotiation"
import { negotiationSchema } from '../schemas/negotiationSchema';

const negotiationController = new NegotationController(negotiationService);

class NegotiationHandler{
    async getAllNegotiations(req:Request, res:Response, next:NextFunction){
        try{
            const negotiations = await negotiationController.getAllNegotiations();
            res.status(200).json(negotiations);
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }

    async getById(req:Request, res:Response, next:NextFunction){
        try{
            const negotiation = await negotiationController.getNegotiationById(Number(req.params.id));
            res.status(201).json(negotiation);
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }

    async postNegotiation(req:Request, res:Response, next:NextFunction){
        try{
            const parsed = negotiationSchema.safeParse(req.body);
            if(!parsed.success)
                return res.status(500).json({message:"Los datos no van acorde al schema", errors:parsed.error.errors});
            
                
            const negotiation = await negotiationController.addNegotiation(req.body.negociacion, req.body.productos);
            res.status(200).json({message:"Negociación agregada correctamente"});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }

    async deleteNegotiation(req:Request, res:Response, next:NextFunction){
        try{
            await negotiationController.deleteNegotiation(Number(req.params.id));
            res.status(200).json({message:"Negociación borrada exitosamente"});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
    async updateNegotiation(req:Request, res:Response, next:NextFunction){
        try{
            const parsed = negotiationSchema.safeParse(req.body);
            if(!parsed.success)
                return res.status(500).json({message:"Los datos no van acorde al schema", errors:parsed.error.errors});
            
            await negotiationController.updateNegotiation(Number(req.params.id), req.body);
            res.status(200).json({message:"Negociación actualizada correctamente"});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
    async updateManyNegotiations(req:Request, res:Response, next:NextFunction){
        const updates = req.body;
        if (!Array.isArray(updates) || updates.some(currElement => !currElement.id || !currElement.data)) {
            res.status(404).json({message: "La solicitud debe ser un arreglo de tipo [{id:negociacionId,data:dataNegociacion}]"})
            return;
        }

        try{
            const updatedNegotiations = await Promise.all(
                updates.map(
                    async (negotiation) =>  negotiationController.updateNegotiation(negotiation.id, negotiation.data)
                ))

            res.status(200).json({message:"Negociación actualizada correctamente", updatedNegotiations});
        } catch(error:unknown){
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "No se pudo completar" });
            }        
        }
    }
}

export default new NegotiationHandler();