import express from 'express'
import clientHandler from '../handlers/client.ts'

const router = express.Router();

router.get("/", clientHandler.getAllClients);
router.get("/:id", clientHandler.getClientById);
router.post("/", clientHandler.postClient);
router.put("/", clientHandler.putClient);
router.delete("/", clientHandler.deleteClient);

export default router;