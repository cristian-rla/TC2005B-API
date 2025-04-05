import express from 'express'
import negotiationHandler from '../handlers/negotiation'

const router = express.Router();

router.get("/", negotiationHandler.getAllNegotiations);

export default router;