import prisma from "./prisma";

class ProductService {
    async getAllProducts() {
      return await prisma.productoServicio.findMany();
    }
  }

export default new ProductService();