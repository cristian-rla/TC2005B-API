import {ProductService} from "../db/product" 

class ProductController{
    service:ProductService;
    constructor(service:ProductService){
        this.service= service;
    }
    async getAll(){
        return await this.service.getAllProducts();
    }
    /*
    async postProduct(){
        return await this.service.postProduct();
    }
    */
}

export default ProductController;