import { ProductService } from "../db/product" 
import { createProductSchema, productDTOSchema, updateProductSchema } from "../schemas/productSchema";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import {singleProductService} from "../db/product"
import { z } from "zod";

type CreateProduct = z.infer<typeof createProductSchema>;

const s3 = new S3Client({
    region:process.env.S3_REGION,
    credentials:{
        accessKeyId:process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
    }
    });

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

        // Se ejecuta si existe una imagen asociada
        if (productDTO.data.productoImagen){
            const originalFilename = productDTO.data.productoImagen.originalFilename ?? "product.jpg";
            const extension = originalFilename?.split(".").pop();
            const params = {
                Bucket:process.env.S3_BUCKET_NAME,
                Key:`${uuidv4()}.${extension}`,
                Body:fs.createReadStream(productDTO.data.productoImagen.filepath),
                ContentType: productDTO.data.productoImagen.mimetype
            }
            
            const upload = await s3.send(new PutObjectCommand(params))
            if ( upload.$metadata.httpStatusCode === 200){
                const newProductPicture = await singleProductService.createPicture(params.Key);
                productData.idFoto = newProductPicture.idFoto;
            }
        }
        return await this.service.createProduct(productDTO.data);
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
            const originalFilename = productDTO.data.productoImagen.originalFilename ?? "product.jpg";
            const extension = originalFilename?.split(".").pop();
            const params = {
                Bucket:process.env.S3_BUCKET_NAME,
                Key:`${uuidv4()}.${extension}`,
                Body:fs.createReadStream(productDTO.data.productoImagen.filepath),
                ContentType: productDTO.data.productoImagen.mimetype
            }
            const upload = await s3.send(new PutObjectCommand(params))

            if (upload.$metadata.httpStatusCode !== 200)
                throw new Error("No se pudo crear la nueva imagen")
            
            const newProductPicture = await singleProductService.createPicture(params.Key);
            
            return await this.service.updateProduct(id, {...productDTO.data, idFoto:newProductPicture.idFoto});

        }

        return await this.service.updateProduct(id, productDTO.data);
    }

    async deleteProduct(id:number){
        return await this.service.deleteProduct(id);
    }
}

export default ProductController;