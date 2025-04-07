import { Prisma } from "@prisma/client";
import prismaClient from "./prisma";

class ProductService {
    async getAllProducts() {
      return await prismaClient.productoServicio.findMany();
    }

    async createProduct(productData: Prisma.ProductoServicioUncheckedCreateInput){
      const newProduct = await prismaClient.productoServicio.create({
        data: productData
      });
      return newProduct;
    }

    async getById(productId:number){
      return await prismaClient.productoServicio.findUnique({
        where:{id:productId}
      });
    }

    async addPicture(productId:number, photo:Buffer){
      return await prismaClient.productoServicioFoto.create({
        data:{productoId:productId, foto:photo}
      });
    }

    async getPictureById(pictureId:number){ // No creo que esta función contribuya, no tenemos el id de las imágenes fuera de estas. 
      return await prismaClient.productoServicioFoto.findFirst({
        where:{idFoto:pictureId}
      });
    }

    async getProductOfPicture(productId:number){
      return await prismaClient.productoServicioFoto.findFirst({
        where:{productoId:productId}
      })
    }

    async deleteProductPicture(pictureId:number){
      return await prismaClient.productoServicioFoto.findUnique({
        where:{idFoto:pictureId}
      })
    }

    async updateProductPicture(pictureId:number, newPhoto:Buffer){
      return await prismaClient.productoServicioFoto.update({
        where:{idFoto:pictureId},
        data:{foto:newPhoto}
      })
    }

    async updateProduct(productId:number, newProductData:Prisma.ProductoServicioUncheckedUpdateInput){
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