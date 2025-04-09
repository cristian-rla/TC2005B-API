import {z} from 'zod'

const productSchema = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    foto:z.string().optional()
});

const productSchemaQuery = z.object({
    nombre:z.string().min(1),
    precio:z.number(),
    stock:z.number(),
    foto:z.string().optional()
});

export {productSchema, productSchemaQuery};