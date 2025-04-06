import express from 'express'
import clientHandler from '../handlers/client'

const router = express.Router();

router.get("/", clientHandler.getAllClients);
router.get("/:id", clientHandler.getClientById);
router.post("/", clientHandler.postClient);
router.put("/:id", clientHandler.putClient);
router.delete("/:id", clientHandler.deleteClient);

export default router;