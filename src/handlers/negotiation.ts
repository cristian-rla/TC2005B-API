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
}

export default new NegotiationHandler();