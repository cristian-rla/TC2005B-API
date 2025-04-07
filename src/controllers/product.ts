import { Prisma } from "@prisma/client";
import {ProductService} from "../db/product" 
import { productSchema } from "../schemas/productSchema";

class ProductController{
    service:ProductService;
    constructor(service:ProductService){
        this.service= service;
    }
    async getAll(){
        return await this.service.getAllProducts();
    }
    async createProduct(nuevoProducto:unknown){
        const parsed = productSchema.safeParse(nuevoProducto);
        if(!parsed.success){
            throw(new Error("Los datos no coinciden con el schema"));
        }
        
        const {foto, ...productData} = parsed.data;
        const newProduct = await this.service.createProduct(productData);
        if(foto){
            this.service.addPicture(newProduct.id, foto);
        }

        return newProduct;
    }

    async getProductById(id:number){
        return await this.service.getById(id);
    }

    async updateProduct(id:number, productData:unknown){
        // Checar caso en el que los datos son exactamente iguales.
        const parsed = productSchema.safeParse(productData);
        if(!parsed.success){
            throw (new Error("Los datos no coinciden con el schema"));
        }

        const previousData = await this.service.getById(id);
        if(previousData === null){
            throw new Error("La id no tiene ningún producto asociado");
        }
        
        const associatedPicture = await this.service.getProductOfPicture(previousData.id);
        if(associatedPicture && parsed.data.foto){
            if(Buffer.compare(associatedPicture.foto, parsed.data.foto)){
                await this.service.updateProductPicture(associatedPicture.idFoto, parsed.data.foto);
            }
        }
        
        const {foto, ...newDataWithoutPicture} = parsed.data;
        return await this.service.updateProduct(id, newDataWithoutPicture);
    }

    async deleteProduct(id:number){
        return await this.service.deleteProduct(id);
    }
}

export default ProductController;