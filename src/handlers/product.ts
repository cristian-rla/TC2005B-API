const ProductController = require('../controllers/product');
const productService = require('../db/product');

const controller = new ProductController(productService);

class CustomerHttpHandler {
  async getAll(req, res, next) {
    try {
      const customers = await controller.getAll();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const customer = await controller.getById(req.params.id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, email } = req.body;
      const newCustomer = await controller.create(name, email);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { name, email } = req.body;
      const updatedCustomer = await controller.update(req.params.id, name, email);
      res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await controller.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerHttpHandler();