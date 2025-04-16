import {z} from 'zod'

const enterpriseSchema = z.object({
    nombre: z.string().min(1),
    industria: z.string().min(1),
    foto: z.string().optional()
});

const enterpriseSchemaQuery = enterpriseSchema.partial();

export {enterpriseSchema, enterpriseSchemaQuery};