import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/product"
import productService from '../db/product';
import {Fields, Files, IncomingForm, File} from "formidable";

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

        const file : File | undefined = Array.isArray(files.productoImagen) // File ya tiene los datos que necesito en el image schema
        ? files.productoImagen[0] // Si es un array, toma el primer elemento
        : files.productoImagen; // Si no es un array, usa el archivo directamente

        let productoImagen;
        if (!file || Object.keys(file).length === 0) { // Checar si el objeto está vacío
          productoImagen= undefined;
        } else{
          productoImagen ={
              originalFilename: file.originalFilename ?? "default.jpg",
              filepath: file.filepath,
              mimetype: file.mimetype ?? "application/octet-stream",
              size: file.size,
              newFilename: file.newFilename,
            };
        }

        const product = await productController.createProduct({
          nombre: String(fields["nombre"]),
          precio: Number(fields["precio"]),
          stock: Number(fields["stock"]),
          productoImagen
        });
        res.status(201).json(product);

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