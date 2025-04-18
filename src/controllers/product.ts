import { ProductService } from "../db/product" 
import { createProductSchema, productDTOSchema, updateProductSchema } from "../schemas/productSchema";
import {singleProductService} from "../db/product"
import { z } from "zod";
import {uploadImage} from "../services/s3";

type CreateProduct = z.infer<typeof createProductSchema>;

class ProductController{
    service:ProductService;
    constructor(service:ProductService){
        this.service= service;
    }
    async getAll(){
        return await this.service.getAllProducts();
    }
    async createProduct(sentProductDTO:unknown){     
        const productDTO = productDTOSchema.safeParse(sentProductDTO);
        if(!productDTO.success){
            throw(new Error("Los datos no coinciden con el schema"));
        }

        try {              
            let productData : CreateProduct= {
                nombre:productDTO.data.nombre,
                stock:productDTO.data.stock,
                precio:productDTO.data.precio
            }; 

            // Se ejecuta si existe una imagen asociada
            if (productDTO.data.productoImagen){
                const productUrl= await uploadImage(productDTO.data.productoImagen);
                const newProductPicture = await singleProductService.createPicture(productUrl);
                productData.idFoto = newProductPicture.idFoto;
            }
            return await this.service.createProduct(productData);
        } catch(error){

            throw (error instanceof Error) ?  new Error(error.message) : new Error("No se pudo crear el usuario");
        }
    }

    async getProductById(id:number){
        return await this.service.getById(id);
    }

    // Aquí solamente se especifican los datos que se cambiaron, por ende, si se mandó una imagen, no se comprobará si es la misma o no.
    async updateProduct(id:number, sentProductDTO:unknown){
        const productDTO = productDTOSchema.safeParse(sentProductDTO);
        if(!productDTO.success){
            throw(new Error("Los datos no coinciden con el schema"));
        }

        const previousData = await this.service.getById(id);
        if(previousData === null){
            throw new Error("La id no tiene ningún producto asociado");
        }

        if (productDTO.data.productoImagen){ // Este condicional es necesario porque puede ser null, y getPictureById no acepta valores nulos. Arroja error
            if(previousData.idFoto !== null){
                await this.service.deleteProductPicture(previousData.idFoto);
            }
            const imageUrl = await uploadImage(productDTO.data.productoImagen)
            const newProductPicture = await singleProductService.createPicture(imageUrl);
            return await this.service.updateProduct(id, {...productDTO.data, idFoto:newProductPicture.idFoto});
        }

        return await this.service.updateProduct(id, productDTO.data);
    }

    async deleteProduct(id:number){
        return await this.service.deleteProduct(id);
    }
}

export default ProductController;