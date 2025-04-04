import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/product"
import productService from '../db/product';

const controller = new ProductController(productService);

class ProductHttpHandler {
  async getAll(req:Request, res:Response, next:NextFunction) {
    try {
      const customers = await controller.getAll();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductHttpHandler();