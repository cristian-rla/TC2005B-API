import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";
import { z } from "zod";
import { productSchema, createProductSchema, updateProductSchema } from "../schemas/productSchema";

type CreateProduct = z.infer<typeof createProductSchema>;
type UpdateProduct = z.infer<typeof updateProductSchema>

class ProductService {
    async getAllProducts() {
      return await prismaClient.productoServicio.findMany();
    }

    async createProduct(productData: CreateProduct){
      const {productUrl, ...productDataWithoutUrl} = productData;
      const data : Prisma.ProductoServicioUncheckedCreateInput = {
        ...productDataWithoutUrl, ...(productUrl ? {ProductoServicioFoto:{create:{foto:productUrl}}}:{})
      };

      const newProduct = await prismaClient.productoServicio.create({
        data 
      });
      return newProduct;
    }

    async getById(productId:number){
      return await prismaClient.productoServicio.findUnique({
        where:{id:productId},
        include:{ProductoServicioFoto:true}
      });
    }

    async getProductOfPicture(productId:number){
      return await prismaClient.productoServicioFoto.findFirst({
        where:{productoId:productId}
      });
    }
    
    // Every picture will be created when a new product is created. This is only to be called when updating a product that didn't have a picture before
    async createPicture(productoId:number, photoUrl:string){
      return await prismaClient.productoServicioFoto.create({
        data:{
          foto:photoUrl,
          ProductoServicio:{
            connect:{
              id:productoId
          }}
        }
      });
    }

    // async getPictureById(pictureId:number){ // No creo que esta función contribuya, no tenemos el id de las imágenes fuera de estas. 
    //   return await prismaClient.productoServicioFoto.findFirst({
    //     where:{idFoto:pictureId}
    //   });
    // }

    async deleteProductPicture(pictureId:number){
      return await prismaClient.productoServicioFoto.delete({
        where:{idFoto:pictureId}
      })
    }

    async updatePicture(pictureId:number, newPhoto:string){ // CHECAR. PUEDE UNIRSE A UPDATE PRODUCT
      return await prismaClient.productoServicioFoto.update({
        where:{idFoto:pictureId},
        data:{foto:newPhoto}
      })
    }

    // Aquí no es necesario el productUrl porque si no había foto antes y se crea una, ahí mismo se tiene que conectar. y si ya había una conectada, solo se actualiza la foto. CAMBIAR EL SCHEMA ENTONCES
    async updateProduct(productId:number, newProductData:UpdateProduct){
        return await prismaClient.productoServicio.update({
        where:{id:productId},
        data:newProductData
      });
    }

    async deleteProduct(productId:number){
      return await prismaClient.productoServicio.delete({
        where:{id:productId}
        })
    }

  }

const singleProductService = new ProductService();

export default singleProductService;
export {ProductService, singleProductService};
// Si hago el export default con los dos entre llaves, exportas solo un objeto