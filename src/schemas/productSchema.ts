// En este caso, es necesario hacer un schema con el id del producto.
// En otros casos no lo es, porque solo se necesitan los datos para crearlos (manejamos autoincrement), y en los getters y put, el id se pasa como route param

import {z} from 'zod'

// Este tipo es el que llega desde el request -----------------------------------------------------------
const image = z.object({    
    originalFilename: z.string().optional(),
    filepath: z.string(),
    mimetype: z.string().optional(),
    size: z.number(),
    newFilename: z.string()
})

const productDTOSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    productoImagen:image.optional() // ESTE NOMBRE CAMBIA DEPENDIENDO DEL ELEMENTO HTML QUE LO MANDA
})

const updateProductDTOSchema = productDTOSchema.partial();

// Esto se manda a la base de datos --------------------------------------
const createProductSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    productUrl:z.string().optional()
})

// Ahora, aparte de que cualquier dato puede o puede no estar, como se tiene el producto desde el frontend, también son accesibles los idFotos si es que tienen una, atributo faltante en el productDTOSchema
const updateProductSchema = createProductSchema.partial();

// Esto regresa la base de datos ---------------------------------------------
const productSchema = createProductSchema.extend({
    id:z.number()
});

export {productSchema, updateProductSchema, productDTOSchema, updateProductDTOSchema, createProductSchema, image};