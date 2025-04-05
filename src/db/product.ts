import prisma from "./prisma";
import { Prisma } from "@prisma/client";

class ProductService {
    async getAllProducts() {
      return await prisma.productoServicio.findMany();
    }
    async createProduct(productData: Prisma.ProductoServicioCreateInput){
      const newProduct = await prisma.productoServicio.create({
        data: productData
      });
      return newProduct;
    }
    async getById(id:number){
      return await prisma.productoServicio.findUnique({where:{id:id}});
    }
    /*
    async postProduct(){
      return await prisma.productoServicio.create({});
    }
    */
  }

const singleProductService = new ProductService();

export default singleProductService;
export {ProductService, singleProductService};
// Si hago el export default con los dos entre llaves, exportas solo un objeto