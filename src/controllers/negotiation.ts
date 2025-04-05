import {NegotiationService} from "../db/negotiation"

class NegotiationController{
    service:NegotiationService;

    constructor(service:NegotiationService){
        this.service = service;
    }

    async getAllNegotiations(){
        return await this.service.getAll();
    }
}

export default NegotiationController;