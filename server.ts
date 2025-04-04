import express from 'express';
import cors from 'cors';
import productRouter from "./src/routes/product"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));