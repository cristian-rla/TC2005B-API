// En este caso, es necesario hacer un schema con el id del producto.
// En otros casos no lo es, porque solo se necesitan los datos para crearlos (manejamos autoincrement), y en los getters y put, el id se pasa como route param


import {z} from 'zod'

// ESte asume que así le llegan los datos desde el frontend, un producto con un link. 
// Pero esto no se puede tener en al capa de DB, porque aquí el producto necesita tener un idFoto, al menos opcional.
const createProductSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    foto:z.string().url().optional()
})

const productSchema = createProductSchema.extend({
    id:z.number()
});

const productSchemaQuery = productSchema.partial();

export {productSchema, productSchemaQuery, createProductSchema};