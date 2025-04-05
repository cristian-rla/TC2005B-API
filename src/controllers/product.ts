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
    async createProduct(nuevoProducto:Prisma.ProductoServicioUncheckedCreateInput){
        return await this.service.createProduct(nuevoProducto);
    }
    async getProductById(id:number){
        return await this.service.getById(id);
    }
    async updateProduct(id:number, productData:Prisma.ProductoServicioUncheckedUpdateInput){
        return await this.service.updateProduct(id, productData);
    }
    async deleteProduct(id:number){
        return await this.service.deleteProduct(id);
    }
}

export default ProductController;