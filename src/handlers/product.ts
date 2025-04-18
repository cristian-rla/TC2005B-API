import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/product"
import productService from '../db/product';
import negotiation from "./negotiation";
import { productSchema, createProductSchema } from "../schemas/productSchema";
import {Fields, Files, IncomingForm} from "formidable";

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
      // Se realiza el parseo en la capa de handlers porque están estrictamente relacionados al tipo de request que se hace, no está dispuesto cómodamente como en un JSON.
      const form = new IncomingForm();
      form.parse(req, async (err, fields:Fields, files:Files)=>{
        if (err) {
          res.status(500).json({message:err});
          return;   
        }

        const products = await productController.createProduct({...fields, files});
        res.status(201).json(products);

      });
      
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

      await productController.updateProduct(Number(req.params.id), req.body);
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