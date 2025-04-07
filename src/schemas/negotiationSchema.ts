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

const negotiationSchema = z.object({
    comision: z.number(),
    asunto: z.string(),
    fecha: z.date(),
    descripcion: z.string(),
    total: z.number()
});

export {negotiationSchema};