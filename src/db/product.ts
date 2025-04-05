import prismaClient from "./prisma";
import { Prisma } from "@prisma/client";

class ProductService {
    async getAllProducts() {
      return await prismaClient.productoServicio.findMany();
    }

    async createProduct(productData: Prisma.ProductoServicioCreateInput){
      const newProduct = await prismaClient.productoServicio.create({
        data: productData
      });
      return newProduct;
    }

    async getById(id:number){
      return await prismaClient.productoServicio.findUnique({
        where:{id:id}
      });
    }

    async updateProduct(id:number, newProductData:Prisma.ProductoServicioUpdateInput){
      return await prismaClient.productoServicio.update({
        where:{id:id},
        data:newProductData
      });
    }

    async deleteProduct(id:number){
      return await prismaClient.productoServicio.delete({
        where:{id:id}
        })
    }

  }

const singleProductService = new ProductService();

export default singleProductService;
export {ProductService, singleProductService};
// Si hago el export default con los dos entre llaves, exportas solo un objeto