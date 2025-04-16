import { ProductService } from "../db/product" 
import { createProductSchema, productSchema } from "../schemas/productSchema";
import { z } from "zod";

type Product = z.infer<typeof productSchema>; // Mover a los schemas estos z.infer
type CreateProduct = z.infer<typeof createProductSchema>;

class ProductController{
    service:ProductService;
    constructor(service:ProductService){
        this.service= service;
    }
    async getAll(){
        return await this.service.getAllProducts();
    }
    async createProduct(productData:CreateProduct){
        const parsed = productSchema.safeParse(productData);
        if(!parsed.success){
            throw(new Error("Los datos no coinciden con el schema"));
        }
        return await this.service.createProduct(parsed.data);
    }

    async getProductById(id:number){
        return await this.service.getById(id);
    }

    async updateProduct(id:number, productData:CreateProduct){
        // Checar caso en el que los datos son exactamente iguales.

        const previousData = await this.service.getById(id);
        if(previousData === null){
            throw new Error("La id no tiene ningún producto asociado");
        }
        if (productData.foto){ // Este condicional es necesario porque puede ser null, y getPictureById no acepta valores nulos. Arroja error
            if(previousData.idFoto !== null){
                await this.service.deleteProductPicture(previousData.idFoto);
            }
            const newPicture = await this.service.createPicture(productData.foto);
            return await this.service.updateProduct(id, {...productData, idFoto:newPicture.idFoto});
        }
        
        const {foto, ...newDataWithoutPicture} = productData;
        return await this.service.updateProduct(id, newDataWithoutPicture);
    }

    async deleteProduct(id:number){
        return await this.service.deleteProduct(id);
    }
}

export default ProductController;