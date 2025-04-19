import {singleEnterpriseService} from "../db/enterprise"

type EnterpriseService = typeof singleEnterpriseService;

class EnterpriseController{
    service:EnterpriseService;
    constructor(service:EnterpriseService){
        this.service=service;
    }
}


export default EnterpriseController