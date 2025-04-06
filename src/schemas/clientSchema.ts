import {z} from 'zod'

const ClientSchema = z.object({
    correo: z.string().min(1),
    nombre: z.string().min(1),
    telefono: z.string().min(7).max(11),
    contrasena:z.string().min(6),
    empresa:z.string().min(1)
});

const ClientSchemaQuery = z.object({
    correo: z.string().min(1).optional(),
    nombre: z.string().min(1).optional(),
    telefono: z.string().min(7).max(11).optional(),
    contrasena:z.string().min(6).optional(),
    empresa:z.string().min(1).optional()
});

export {ClientSchema, ClientSchemaQuery};