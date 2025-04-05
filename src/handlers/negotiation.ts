import {Request, Response, NextFunction} from 'express'

import NegotationController from "../controllers/negotiation"
import negotiationService from "../db/negotiation"

const negotiationController = new NegotationController(negotiationService);

class NegotiationHandler{
    async getAllNegotiations(req:Request, res:Response, next:NextFunction){
        try{
            const negotiations = await negotiationController.getAllNegotiations();
            res.status(200).json(negotiations);
        } catch(error){
            res.status(404).json(error);
        }
    }

    async getById(req:Request, res:Response, next:NextFunction){
        try{
            const negotiation = await negotiationController.getNegotiationById(Number(req.params.id));
            res.status(201).json(negotiation);
        } catch(error){
            res.status(404).json(error);
        }
    }

    async postNegotiation(req:Request, res:Response, next:NextFunction){
        try{
            const negotiation = await negotiationController.addNegotiation(req.body);
            res.status(200);
        } catch(error){
            res.status(404).json(error);
        }
    }

    async deleteNegotiation(req:Request, res:Response, next:NextFunction){
        try{
            await negotiationController.deleteNegotiation(Number(req.params.id));
            res.status(200).json("Negociación borrada exitosamente");
        }catch(error){
            res.status(404).json(error)
        }
    }
    async updateNegotiation(req:Request, res:Response, next:NextFunction){
        try{
            await negotiationController.updateNegotiation(Number(req.params.id), req.body);
            res.status(200).json("Negociación actualizada correctamente");
        } catch(error){
            res.status(404).json(error);
        }
    }
}

export default new NegotiationHandler();