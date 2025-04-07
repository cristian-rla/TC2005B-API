import express from 'express'
import negotiationHandler from '../handlers/negotiation'

const router = express.Router();

router.get("/", negotiationHandler.getAllNegotiations);
router.get("/:id", negotiationHandler.getById);
router.post("/", negotiationHandler.postNegotiation);
router.put("/:id", negotiationHandler.updateNegotiation);
router.put("/", negotiationHandler.updateManyNegotiations);
router.delete("/:id", negotiationHandler.deleteNegotiation);

export default router;