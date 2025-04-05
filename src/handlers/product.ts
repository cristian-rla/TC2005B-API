import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/product"
import productService from '../db/product';
import {z} from 'zod'

const productController = new ProductController(productService);

class ProductHttpHandler {
  async getAll(req:Request, res:Response, next:NextFunction) {
    try {
      const products = await productController.getAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req:Request, res:Response, next:NextFunction){
    try{
      const product = await productController.getProductById(req.body.id);
    } catch(error){
      res.status(404).json(error);
      //next(error);
    }
  }
  
  async postProduct(req:Request, res:Response, next:NextFunction){
    try {
      // VALIDACIÓN IMPORTANTE CON ZOD
      const products = await productController.createProduct(req.body); // IMPORTANTE CHECAR QUE SEA EL TIPO SOLICITADO
      res.status(201).json(products);
    } catch(error){
      next(error)
    }
  }

}

export default new ProductHttpHandler();