import { singleProductService } from "../db/product" 
import { CreateProduct, productDTOSchema, updateProductDTOSchema, updateProductSchema } from "../schemas/productSchema";
import {deleteImage, uploadImage} from "../services/s3";
import { DbProductError, ImgServiceError, DbProductErrorWithPicture } from "../schemas/appError";

type ProductService = typeof singleProductService;

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
            let productUrl:string | undefined;

            if (productDTO.data.productoImagen)            // Se ejecuta si existe una imagen asociada
                productUrl= await uploadImage(productDTO.data.productoImagen);
            
            try{
                return await this.service.createProduct({...productData, productUrl});
            } catch(error){ // Ya se subió la imagen (si fue especificada) pero no se pudo completar el producto
                console.log(error);
                throw new DbProductError("No se pudo crear el producto", "PRODUCT_FAILED_UPLOAD", 500, productUrl);
            }
            
        } catch(error){
            if(error instanceof DbProductError){
                switch (error.code){
                    case("PRODUCT_PICTURE_FAILED_UPLOAD"):{
                        if(!error.imageUrl){ // La imagen debería ser definida si es que la función del servicio de almacenamientos no arrojó errores.
                            throw error; 
                        }
                        await deleteImage(error.imageUrl);
                        break;
                    }case("PRODUCT_FAILED_UPLOAD"):{ // Si no se creó el producto, entonces no hay ningúna imagen que borrar, se crean al mismo tiempo
                        // imageUrl es undefined si no se estableció una imagen o si el bucket no completó bien la subida (pero ya arroja errores internos).
                        if(error.imageUrl){
                            console.log(error);
                            await deleteImage(error.imageUrl);
                        }
                        break;
                    }
                }

            }
            throw error;
        }
    }

    async getProductById(id:number){
        return await this.service.getById(id);
    }

    // Aquí solamente se especifican los datos que se cambiaron, por ende, si se mandó una imagen, no se comprobará si es la misma o no.
    async updateProduct(id:number, sentProductDTO:unknown){
        const productDTO = updateProductDTOSchema.safeParse(sentProductDTO); // UTILIZAR STRIP PARA NO MANDAR DATOS DE MÁS A LA CAPA DE BASE DE DATOS
        if(!productDTO.success){
            throw(new Error("Los datos no coinciden con el schema"));
        }

        const previousData = await this.service.getById(id);
        if(previousData === null){
            throw new Error("La id no tiene ningún producto asociado");
        }

        try{
            let pictureUrl:string | undefined;
            if (productDTO.data.productoImagen){ // Este condicional es necesario porque puede ser null, y getPictureById no acepta valores nulos. Arroja error
                const pastPicture = await this.service.getProductOfPicture(previousData.id);
                pictureUrl = await uploadImage(productDTO.data.productoImagen);

                if(pastPicture){ // si ya se tenía una imagen antes, y se sube otra imagen, se actualiza
                    await this.service.updatePicture(pastPicture.idFoto, pictureUrl);
                    await deleteImage(pastPicture.foto);
                    
                } else { // No existía una foto antes, así que se tiene que crear una y asignarla al producto
                    await this.service.createPicture(id,pictureUrl);
                }                
            }

            const product = {
                nombre:productDTO.data.nombre,
                precio:productDTO.data.precio,
                stock:productDTO.data.stock, 
            }
            
            try{
                return await this.service.updateProduct(id, product);
            } catch(error){ 
                // ES NECESARIO BORRAR LA FOTO QUE SE CREO JUSTO PARA ESTE OBJETO EN CASO DE QUE HAYA HABIDO UN ERROR EN EL UPDATE PRODUCT
                console.log(error);
                throw new DbProductError("No se pudo actualizar el producto", "PRODUCT_FAILED_UPDATE", 500, pictureUrl);
            }
            
        } catch(error){
            if(error instanceof DbProductError){
                switch (error.code){
                    case("PRODUCT_PICTURE_FAILED_UPDATE"):{ // Aquí no es necesario borrar la imagen ya asociada al producto
                        console.log(error);
                        deleteImage(error.imageUrl!); // Aquí se sabe que es necesario que se mande un imageUrl al poner este código
                        break;
                    }case("PRODUCT_FAILED_UPDATE"):{ // No es necesario borrar ninguna imagen 
                        if(error.imageUrl){
                            console.log(error);
                        }
                        break;
                    }
                }
                throw error;
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

        if(product.ProductoServicioFoto){
            await deleteImage(product.ProductoServicioFoto.foto);
        }

        return await this.service.deleteProduct(id);
    }
}

export default ProductController;