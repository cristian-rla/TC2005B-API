import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/product"
import productService from '../db/product';
import negotiation from "./negotiation";
import { productSchema, createProductSchema } from "../schemas/productSchema";

const productController = new ProductController(productService);

class ProductHttpHandler {
  async getAll(req:Request, res:Response, next:NextFunction) {
    try {
      const products = await productController.getAll();
      res.json(products);
    } catch(error:unknown){
      if (error instanceof Error) {
          res.status(404).json({ message: error.message });
      } else {
          res.status(404).json({ message: "No se pudo completar" });
      }        
    }
  }

  async getProductById(req:Request, res:Response, next:NextFunction){
    try{
      const product = await productController.getProductById(Number(req.params.id)); // query params se pasan como strings por defecto. id convertido a numero 
      res.status(200).json(product);
    } catch(error:unknown){
      if (error instanceof Error) {
          res.status(404).json({ message: error.message });
      } else {
          res.status(404).json({ message: "No se pudo completar" });
      }        
    }
  }
  
  async postProduct(req:Request, res:Response, next:NextFunction){
    try {
      const parsed = createProductSchema.safeParse(req.body);
      if(!parsed.success){
        res.status(500).json({message:"Los datos no van acorde al schema", errors:parsed.error.errors});
        return;
    }
      const products = await productController.createProduct(req.body);
      res.status(201).json(products);
      
    } catch(error:unknown){
      if (error instanceof Error) {
          res.status(404).json({ message: error.message });
      } else {
          res.status(404).json({ message: "No se pudo completar" });
      }        
    }
  }

  async updateProduct(req:Request, res:Response, next:NextFunction){
    try{
      const parsed = createProductSchema.safeParse(req.body);

      if(!parsed.success){
        res.status(500).json({message:"Los datos no van acorde al schema", errors:parsed.error.errors});
        return;
    }
      await productController.updateProduct(Number(req.params.id), parsed.data);
      res.status(200).json("Se actualizó el producto correctamente");
    } catch(error:unknown){
      if (error instanceof Error) {
          res.status(404).json({ message: error.message });
      } else {
          res.status(404).json({ message: "No se pudo completar" });
      }        
    }
  }
  
  async deleteProduct(req:Request, res:Response, next:NextFunction){
    try{
      await productController.deleteProduct(Number(req.params.id));
      res.status(200).json("Se eliminó el producto satisfactoriamente");
    } catch(error:unknown){
      if (error instanceof Error) {
          res.status(404).json({ message: error.message });
      } else {
          res.status(404).json({ message: "No se pudo completar" });
      }        
    }
  }
}

export default new ProductHttpHandler();