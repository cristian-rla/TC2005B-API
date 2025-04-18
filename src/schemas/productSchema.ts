// En este caso, es necesario hacer un schema con el id del producto.
// En otros casos no lo es, porque solo se necesitan los datos para crearlos (manejamos autoincrement), y en los getters y put, el id se pasa como route param

import {z} from 'zod'

// ESte asume que así le llegan los datos desde el frontend, un producto con un link. 
// Pero esto no se puede tener en al capa de DB, porque aquí el producto necesita tener un idFoto, al menos opcional.
const createProductSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    idFoto:z.number().optional()
})


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
    productoImagen:image // ESTE NOMBRE CAMBIA DEPENDIENDO DEL ELEMENTO HTML QUE LO MANDA
})

const productSchema = createProductSchema.extend({
    id:z.number()
});

const updateProductSchema = productSchema.partial();

export {productSchema, updateProductSchema, productDTOSchema, createProductSchema};