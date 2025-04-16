import {z} from 'zod'

const userSchema = z.object({
    nombre:z.string().min(3),
    contrasena:z.string().min(6), 
    email:z.string()
})

export {userSchema};