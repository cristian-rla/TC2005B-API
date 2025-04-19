import {z} from 'zod'


// Aquí sí es necesario que tenga los ids de los productos, de los usuarios y de los clientes.
export const negotiationSchema = z.object({
    asunto: z.string(),
    fecha: z.date(), 
    descripcion: z.string(),
    comision: z.number(),
    total: z.number(), 
    idUsuarios: z.number(),
    idClientes: z.number(),
    idEstado: z.number()
});

export type CreateNegotiation = z.infer<typeof negotiationSchema>;