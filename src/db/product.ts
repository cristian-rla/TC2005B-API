const prisma = require('./prisma');

class ProductService {
    async getAllProducts() {
      return await prisma.customer.findMany();
    }
  
    async getProductById(id:number) {
      return await prisma.customer.findUnique({
        where: { id: Number(id) },
      });
    }
  
    async createProduct(name:string, email:string) {
      return await prisma.customer.create({
        data: { name, email },
      });
    }
  
    async updateProduct(id:number, name:string, email:string) {
      return await prisma.customer.update({
        where: { id: Number(id) },
        data: { name, email },
      });
    }
  
    async deleteProduct(id:number) {
      await prisma.customer.delete({
        where: { id: Number(id) },
      });
    }
  }
  
  module.exports = new ProductService();