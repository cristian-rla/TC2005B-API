import {z} from 'zod'

export const clientSchema = z.object({
    correo: z.string().min(1),
    nombre: z.string().min(1),
    telefono: z.string().min(7).max(12),
    contrasena:z.string().min(6),
    idEmpresa:z.number().min(1)
});

export type CreateClient = z.infer<typeof clientSchema>
