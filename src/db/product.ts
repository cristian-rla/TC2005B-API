import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";
import { z } from "zod";
import { productSchema, createProductSchema } from "../schemas/productSchema";

type createProduct = z.infer<typeof createProductSchema>
class ProductService {
    async getAllProducts() {
      return await prismaClient.productoServicio.findMany();
    }

    async createProduct(productData: createProduct){
      const {foto, ...product} = productData;
      const newProduct = await prismaClient.productoServicio.create({
        data: {
          ...product, ProductoServicioFoto : (foto ? {create:{foto}} : undefined)
        }
        
      });
      return newProduct;
    }

    async getById(productId:number){
      return await prismaClient.productoServicio.findUnique({
        where:{id:productId}
      });
    }
    
    // Tengo dudas aquí, creo que photo se pasa el string, pero foto es la relación, entonces se tiene que corregir esto.
    async createPicture(photo:string){
      return await prismaClient.productoServicioFoto.create({
        data:{foto:photo}
      });
    }
    
    async getPictureById(pictureId:number){ // No creo que esta función contribuya, no tenemos el id de las imágenes fuera de estas. 
      return await prismaClient.productoServicioFoto.findFirst({
        where:{idFoto:pictureId}
      });
    }

    async deleteProductPicture(pictureId:number){
      return await prismaClient.productoServicioFoto.findUnique({
        where:{idFoto:pictureId}
      })
    }

    async updatePicture(pictureId:number, newPhoto:string){ // CHECAR. PUEDE UNIRSE A UPDATE PRODUCT
      return await prismaClient.productoServicioFoto.update({
        where:{idFoto:pictureId},
        data:{foto:newPhoto}
      })
    }

    async updateProduct(productId:number, newProductData:Prisma.ProductoServicioUncheckedCreateInput){
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