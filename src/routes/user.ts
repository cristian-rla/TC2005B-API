const express = require('express');
const customerHttpHandler = require('../handlers/customer');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, customerHttpHandler.getAll);
router.get('/:id', authMiddleware, customerHttpHandler.getById);
router.post('/', authMiddleware, customerHttpHandler.create);
router.put('/:id', authMiddleware, customerHttpHandler.update);
router.delete('/:id', authMiddleware, customerHttpHandler.delete);
