import {ProductService} from "../db/product" 
import { Prisma } from "@prisma/client";

class ProductController{
    service:ProductService;
    constructor(service:ProductService){
        this.service= service;
    }
    async getAll(){
        return await this.service.getAllProducts();
    }
    async createProduct(nuevoProducto:Prisma.ProductoServicioCreateInput){
        return await this.service.createProduct(nuevoProducto);
    }
    async getProductById(id:number){
        return await this.service.getById(id);
    }

}

export default ProductController;