/*
import NegotiationController from "../../controllers/negotiation";
import { NegotiationService } from "../../db/negotiation";
import { negotiationSchema } from "../../schemas/negotiationSchema";

// Mocks manuales para servicios externos
jest.mock("../../db/client", () => ({
  singleClientService: {
    getById: jest.fn(),
  },
}));

jest.mock("../../db/user", () => ({
  __esModule: true,
  default: {
    getById: jest.fn(),
  },
}));

// Importamos mocks ya activos
import { singleClientService } from "../../db/client";
import singleUserService from "../../db/user";

const mockService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  createProductRelations: jest.fn()
} as unknown as NegotiationService;

const controller = new NegotiationController(mockService);

describe("NegotiationController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllNegotiations should return all negotiations", async () => {
    const negotiations = [{ id: 1 }];
    mockService.getAll = jest.fn().mockResolvedValue(negotiations);

    const result = await controller.getAllNegotiations();
    expect(result).toEqual(negotiations);
    expect(mockService.getAll).toHaveBeenCalled();
  });

  test("getNegotiationById should return negotiation", async () => {
    const negotiation = { id: 1 };
    mockService.getById = jest.fn().mockResolvedValue(negotiation);

    const result = await controller.getNegotiationById(1);
    expect(result).toEqual(negotiation);
    expect(mockService.getById).toHaveBeenCalledWith(1);
  });

  test("addNegotiation should validate, check client/user, and create negotiation and product relations", async () => {
    const negotiationData = {
      idClientes: 1,
      idUsuarios: 1,
      fecha: "2023-01-01",
      tipo: "contado"
    };
    const products = [
      { id: 1, cantidad: 2, precio: 100 },
      { id: 2, cantidad: 1, precio: 200 }
    ];

    // Mocks de servicios externos
    (singleClientService.getById as jest.Mock).mockResolvedValue({ id: 1 });
    (singleUserService.getById as jest.Mock).mockResolvedValue({ id: 1 });
    mockService.create = jest.fn().mockResolvedValue({ id: 999 });
    mockService.createProductRelations = jest.fn();

    const result = await controller.addNegotiation(negotiationData, products);

    expect(mockService.create).toHaveBeenCalledWith({
      ...negotiationData,
      fecha: new Date("2023-01-01")
    });

    expect(mockService.createProductRelations).toHaveBeenCalledTimes(2);
    expect(mockService.createProductRelations).toHaveBeenCalledWith({
      idNegociacion: 999,
      idProducto: 1,
      cantidad: 2,
      subtotal: 200
    });
    expect(mockService.createProductRelations).toHaveBeenCalledWith({
      idNegociacion: 999,
      idProducto: 2,
      cantidad: 1,
      subtotal: 200
    });

    expect(result).toEqual({ id: 999 });
  });

  test("addNegotiation should throw if schema is invalid", async () => {
    await expect(controller.addNegotiation({ invalid: true }, [])).rejects.toThrow(
      "Los datos mandados no cumplen con el schema de negociación"
    );
  });

  test("addNegotiation should throw if client does not exist", async () => {
    const data = {
      idClientes: 123,
      idUsuarios: 1,
      fecha: "2023-01-01",
      tipo: "contado"
    };
    (singleClientService.getById as jest.Mock).mockResolvedValue(null);

    await expect(controller.addNegotiation(data, [])).rejects.toThrow(
      `El cliente de id 123 no existe`
    );
  });

  test("addNegotiation should throw if user does not exist", async () => {
    const data = {
      idClientes: 1,
      idUsuarios: 77,
      fecha: "2023-01-01",
      tipo: "contado"
    };
    (singleClientService.getById as jest.Mock).mockResolvedValue({ id: 1 });
    (singleUserService.getById as jest.Mock).mockResolvedValue(null);

    await expect(controller.addNegotiation(data, [])).rejects.toThrow(
      `El usuario de id 77 no existe`
    );
  });

  test("deleteNegotiation should call delete", async () => {
    mockService.delete = jest.fn().mockResolvedValue(true);
    const result = await controller.deleteNegotiation(5);
    expect(result).toBe(true);
    expect(mockService.delete).toHaveBeenCalledWith(5);
  });

  test("updateNegotiation should validate and update negotiation", async () => {
    const updateData = {
      idClientes: 1,
      idUsuarios: 1,
      fecha: "2023-02-01",
      tipo: "crédito"
    };

    (singleClientService.getById as jest.Mock).mockResolvedValue({ id: 1 });
    (singleUserService.getById as jest.Mock).mockResolvedValue({ id: 1 });
    mockService.update = jest.fn().mockResolvedValue({ id: 42 });

    const result = await controller.updateNegotiation(42, updateData);

    expect(mockService.update).toHaveBeenCalledWith(42, {
      ...updateData,
      fecha: new Date("2023-02-01")
    });
    expect(result).toEqual({ id: 42 });
  });

  test("updateNegotiation should throw if schema is invalid", async () => {
    await expect(controller.updateNegotiation(1, { fail: true })).rejects.toThrow(
      "Los datos mandados no cumplen con el schema de negociación"
    );
  });
});

*/