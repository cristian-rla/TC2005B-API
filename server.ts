import express from 'express';
import cors from 'cors';
import productRouter from "./src/routes/product"
import negotiationRouter from "./src/routes/negotiation"
import clientRouter from "./src/routes/client"
import authRouter from "./src/routes/auth"
import userRouter from "./src/routes/user"
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/productoServicio", productRouter);
app.use("/api/negociacion", negotiationRouter);
app.use("/api/cliente", clientRouter);
app.use("/api/auth", authRouter);
app.use("/api/usuario", userRouter);

// app.listen(3000, () => console.log("Server running on http://localhost:3000"));

export default app;