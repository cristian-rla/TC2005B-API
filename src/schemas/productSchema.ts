import {z} from 'zod'

const productSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    foto:z.instanceof(Buffer).optional()
});

const productSchemaQuery = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    foto:z.instanceof(Buffer).optional()
});

export {productSchema, productSchemaQuery};