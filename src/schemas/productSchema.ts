// En este caso, es necesario hacer un schema con el id del producto.
// En otros casos no lo es, porque solo se necesitan los datos para crearlos (manejamos autoincrement), y en los getters y put, el id se pasa como route param

import {z} from 'zod'

/*=================================================================================================
    HTTP PRODUCT SCHEMAS (Datos recibidos en la capa handler)
====================================================================================================*/
export const image = z.object({    
    originalFilename: z.string().optional(),
    filepath: z.string(),
    mimetype: z.string().optional(),
    size: z.number(),
    newFilename: z.string()
})

export const productDTOSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    productoImagen:image.optional() // El nombre de este campo se origina desde el request. Desde el frontend, el nombre del campo debe coincidir.
})

export const updateProductDTOSchema = productDTOSchema.partial();

export type ProductRequest = z.infer<typeof productDTOSchema>;
export type ImageRequest = z.infer<typeof image>;
export type UpdateProductRequest = z.infer<typeof updateProductDTOSchema>;

/*=================================================================================================
    DATABASE PRODUCT SCHEMAS (Formato para queries en la base de datos)
====================================================================================================*/
export const createProductSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    productUrl:z.string().optional()
})
export const updateProductSchema = createProductSchema.partial();

export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>

/*=================================================================================================
    DATABASE RETURN PRODUCT SCHEMAS (Datos enviados desde la base de datos)
====================================================================================================*/
export const productSchema = createProductSchema.extend({
    id:z.number()
});

export type Product = z.infer<typeof productSchema>
