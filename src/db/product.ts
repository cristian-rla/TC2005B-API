import prisma from "./prisma";

class ProductService {
    async getAllProducts() {
      return await prisma.productoServicio.findMany();
    }
  }

const singleProductService = new ProductService();

export default singleProductService;
export {ProductService, singleProductService};
// Si hago el export default con los dos entre llaves, exportas solo un objeto