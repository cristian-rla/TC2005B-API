import {z} from 'zod'

/*
model Negociacion {
  id          Int      @id @default(autoincrement())
  idUsuarios  Int
  idClientes  Int
  idEstado    Int
  fecha       DateTime
  asunto      String   @db.VarChar(50)
  descripcion String   @db.VarChar(500)
  comision    Float
  total       Float
  usuario     Usuario  @relation(fields: [idUsuarios], references: [id])
  cliente     Cliente  @relation(fields: [idClientes], references: [id])
  estado      Estado   @relation(fields: [idEstado], references: [id])
  productos   ProductoNegociacion[]
}
*/

// No se puede simplemente crear un nuevo usuario si no existe, tal como se hace con las empresas al crear un nuevo usuario o con las fotos de producto.
// Aquí sí es necesario que tenga los ids de los productos, de los usuarios y de los clientes.
const negotiationSchema = z.object({
    asunto: z.string(),
    fecha: z.string(), // En el controlador se cambiará a date
    descripcion: z.string(),
    comision: z.number(),
    total: z.number(), 
    idUsuarios: z.number(),
    idClientes: z.number(),
    idEstado: z.number()
});

export {negotiationSchema};