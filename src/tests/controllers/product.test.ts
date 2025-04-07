import ProductController from "../../controllers/product";
import { ProductService } from "../../db/product";
import { productSchema } from "../../schemas/productSchema";

const mockService = {
  getAllProducts: jest.fn(),
  createProduct: jest.fn(),
  getById: jest.fn(),
  deleteProduct: jest.fn(),
  updateProduct: jest.fn(),
  addPicture: jest.fn(),
  getProductOfPicture: jest.fn(),
  updateProductPicture: jest.fn()
} as unknown as ProductService;

const controller = new ProductController(mockService);

describe("ProductController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll should return all products", async () => {
    const products = [{ id: 1, name: "Producto 1" }];
    mockService.getAllProducts = jest.fn().mockResolvedValue(products);

    const result = await controller.getAll();
    expect(result).toEqual(products);
    expect(mockService.getAllProducts).toHaveBeenCalled();
  });

  test("createProduct should validate and create product", async () => {
    const newProduct = {
      nombre: "Test",
      precio: 100,
      descripcion: "desc",
      foto: Buffer.from("imagen")
    };

    const createdProduct = { id: 1, ...newProduct };
    mockService.createProduct = jest.fn().mockResolvedValue(createdProduct);
    mockService.addPicture = jest.fn();

    const result = await controller.createProduct(newProduct);

    expect(mockService.createProduct).toHaveBeenCalledWith({
      nombre: "Test",
      precio: 100,
      descripcion: "desc"
    });

    expect(mockService.addPicture).toHaveBeenCalledWith(1, newProduct.foto);
    expect(result).toEqual(createdProduct);
  });

  test("createProduct should throw error on invalid data", async () => {
    await expect(controller.createProduct({ foo: "bar" })).rejects.toThrow(
      "Los datos no coinciden con el schema"
    );
  });

  test("getProductById should return product", async () => {
    const product = { id: 1, nombre: "Test" };
    mockService.getById = jest.fn().mockResolvedValue(product);

    const result = await controller.getProductById(1);
    expect(result).toEqual(product);
    expect(mockService.getById).toHaveBeenCalledWith(1);
  });

  test("updateProduct should update data and picture if different", async () => {
    const id = 1;
    const productData = {
      nombre: "Actualizado",
      precio: 100,
      descripcion: "desc",
      foto: Buffer.from("nueva")
    };

    const previousData = { id };
    const previousPicture = { idFoto: 10, foto: Buffer.from("vieja") };

    mockService.getById = jest.fn().mockResolvedValue(previousData);
    mockService.getProductOfPicture = jest.fn().mockResolvedValue(previousPicture);
    mockService.updateProductPicture = jest.fn();
    mockService.updateProduct = jest.fn().mockResolvedValue({ id, ...productData });

    const result = await controller.updateProduct(id, productData);

    expect(mockService.updateProductPicture).toHaveBeenCalled();
    expect(mockService.updateProduct).toHaveBeenCalledWith(id, {
      nombre: "Actualizado",
      precio: 100,
      descripcion: "desc"
    });
    expect(result).toEqual({ id, ...productData });
  });

  test("updateProduct should throw error if product not found", async () => {
    mockService.getById = jest.fn().mockResolvedValue(null);

    await expect(
      controller.updateProduct(99, {
        nombre: "x",
        precio: 1,
        descripcion: "y",
        foto: Buffer.from("img")
      })
    ).rejects.toThrow("La id no tiene ningún producto asociado");
  });

  test("updateProduct should not update picture if it is the same", async () => {
    const buffer = Buffer.from("igual");
    mockService.getById = jest.fn().mockResolvedValue({ id: 1 });
    mockService.getProductOfPicture = jest.fn().mockResolvedValue({ idFoto: 2, foto: buffer });
    mockService.updateProduct = jest.fn().mockResolvedValue({ id: 1 });

    await controller.updateProduct(1, {
      nombre: "x",
      precio: 1,
      descripcion: "y",
      foto: buffer
    });

    expect(mockService.updateProductPicture).not.toHaveBeenCalled();
  });

  test("deleteProduct should call delete on service", async () => {
    mockService.deleteProduct = jest.fn().mockResolvedValue(true);
    const result = await controller.deleteProduct(1);

    expect(mockService.deleteProduct).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });
});
