import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/product"
import productService from '../db/product';

const controller = new ProductController(productService);

class ProductHttpHandler {
  async getAll(req:Request, res:Response, next:NextFunction) {
    try {
      const products = await controller.getAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
  /*
  async postProduct(req:Request, res:Response, next:NextFunction){
    try {
      const products = await controller.postProduct();
      res.status(201).json(products);
    } catch(error){
      next(error)
    }
  }
  */
}

export default new ProductHttpHandler();