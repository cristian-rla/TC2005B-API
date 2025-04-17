import {z} from 'zod'

const clientSchema = z.object({
    correo: z.string().min(1),
    nombre: z.string().min(1),
    telefono: z.string().min(7).max(12),
    contrasena:z.string().min(6),
    idEmpresa:z.number().min(1)
});

const clientSchemaQuery = clientSchema.partial();

export {clientSchema, clientSchemaQuery};