import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Habilita CORS
app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
    try {
        if(await prisma.cliente.findFirst({where:{correo:req.body.correo}})){
            throw(new Error("Email, already exists"));
        }
        if(req.body.empresa){
            let empresaRegistro = await prisma.empresa.findFirst({where:{nombre:req.body.empresa}});
            if(!empresaRegistro){
                empresaRegistro = await prisma.empresa.create(
                    {data:{nombre:req.body.empresa}}
                );
            }
            const {empresa, ...simpleUser} = req.body; // Aquí por algún motivo se manda siempres un atributo enterprise. Se extirpó temporalmente. Es necesario identificar la causa de su generación.
            const user = await prisma.cliente.create({
                data: {...simpleUser, // NO se especifica con prisma el id, se indica en el objeto tipo empresa que está relacionado a cliente
                    empresa:{
                        connect:{
                            id:empresaRegistro.id}
                        }
                    }
            });
        } else{
            const {empresa, ...simpleUser} = req.body;
            const user = await prisma.cliente.create({
                data: {simpleUser}
            });
        }
        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
