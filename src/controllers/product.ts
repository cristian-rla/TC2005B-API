import { ProductService } from "../db/product" 
import { createProductSchema, productDTOSchema, updateProductSchema } from "../schemas/productSchema";
import {singleProductService} from "../db/product"
import { z } from "zod";
import {deleteImage, uploadImage} from "../services/s3";
import { DbProductError, ImgServiceError } from "../schemas/appError";

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
        
        let productData : CreateProduct= {
            nombre:productDTO.data.nombre,
            stock:productDTO.data.stock,
            precio:productDTO.data.precio
        }; 
        try{
            // Se ejecuta si existe una imagen asociada
            let productUrl;
            if (productDTO.data.productoImagen){
                productUrl= await uploadImage(productDTO.data.productoImagen);
                const newProductPicture = await singleProductService.createPicture(productUrl);
                productData.idFoto = newProductPicture.idFoto;
            }

            try{
                return await this.service.createProduct(productData);
            } catch(error){
                throw new DbProductError("No se pudo crear el producto", "PRODUCT_FAILED_UPLOAD", 500, productUrl);
            }
            
        } catch(error){
            if(error instanceof DbProductError){
                switch (error.code){
                    case("PRODUCT_PICTURE_FAILED_UPLOAD"):{
                        deleteImage(error.imageUrl!); // Aquí se sabe que es necesario que se mande un imageUrl al poner este código
                        break;
                    }case("PRODUCT_FAILED_UPLOAD"):{
                        if(error.imageUrl){
                            deleteImage(error.imageUrl);
                            this.service.deleteProductPicture(error.pictureId!);
                        }
                        break;
                    }
                }
            } else{
                throw error;
            }
        }
    }

    async getProductById(id:number){
        return await this.service.getById(id);
    }

    // Aquí solamente se especifican los datos que se cambiaron, por ende, si se mandó una imagen, no se comprobará si es la misma o no.
    async updateProduct(id:number, sentProductDTO:unknown){
        const productDTO = updateProductSchema.safeParse(sentProductDTO);
        if(!productDTO.success){
            throw(new Error("Los datos no coinciden con el schema"));
        }

        const previousData = await this.service.getById(id);
        if(previousData === null){
            throw new Error("La id no tiene ningún producto asociado");
        }

        try{
            if (productDTO.data.productoImagen){ // Este condicional es necesario porque puede ser null, y getPictureById no acepta valores nulos. Arroja error
                if(previousData.idFoto !== null){
                    await this.service.deleteProductPicture(previousData.idFoto);
                }
                const imageUrl = await uploadImage(productDTO.data.productoImagen)
                const newProductPicture = await singleProductService.createPicture(imageUrl);
                try{
                    return await this.service.updateProduct(id, {...productDTO.data, idFoto:newProductPicture.idFoto});
                } catch(error){
                    throw new DbProductError("No se pudo crear el producto", "PRODUCT_FAILED_UPLOAD", 500, imageUrl);
                }
            }
            
            return await this.service.updateProduct(id, productDTO.data);
        } catch(error){
            if(error instanceof DbProductError){
                switch (error.code){
                    case("PRODUCT_PICTURE_FAILED_UPLOAD"):{
                        deleteImage(error.imageUrl!); // Aquí se sabe que es necesario que se mande un imageUrl al poner este código
                        break;
                    }case("PRODUCT_FAILED_UPLOAD"):{
                        if(error.imageUrl){
                            deleteImage(error.imageUrl);
                            this.service.deleteProductPicture(error.pictureId!);
                        }
                        break;
                    }
                }
            } else{
                throw error;
            }
        }
    }

    // Aquí no es necesario borrar la imagen porque desde el servicio de base de datos ya tenemos una cascada que borra el registro de foto si existe una relación
    async deleteProduct(id:number){

        const product = await this.service.getById(id);
        if(!product){
            throw new Error(`El producto bajo el identificador ${id} no existe`);
        }

        if(product.idFoto){
            const picture = await this.service.deleteProductPicture(product.idFoto); // Se realiza manualmente aunque tenga cascade porque la relación es uno a muchos (para evitar el unique y tener varios campos con idFoto null).
            if(picture){ // Si esto es falso, entonces el producto apunta a un registro de foto eliminado de la base de datos.
                await deleteImage(picture.foto);
            }
        }

        return await this.service.deleteProduct(id);
    }
}

export default ProductController;