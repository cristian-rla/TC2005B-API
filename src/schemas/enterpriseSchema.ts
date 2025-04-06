import {z} from 'zod'

const EnterpriseSchema = z.object({
    nombre: z.string().min(1),
    industria: z.string().min(1),
    foto: z.instanceof(Buffer).optional()
});

const EnterpriseSchemaQuery = z.object({
    nombre: z.string().min(1).optional(),
    industria: z.string().min(1).optional(),
    foto: z.instanceof(Buffer).optional()
});

export {EnterpriseSchema, EnterpriseSchemaQuery};