import {z} from 'zod'

export const userSchema = z.object({
    nombre:z.string().min(3),
    contrasena:z.string().min(6), 
    email:z.string()
})

export type UserRequest = z.infer<typeof userSchema>;