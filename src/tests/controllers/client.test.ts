import ClientController from "../../controllers/client";
import { ClientService } from "../../db/client";
import { ClientSchema } from "../../schemas/clientSchema";

// Mock de singleEnterpriseService
jest.mock("../../db/enterprise", () => ({
  singleEnterpriseService: {
    getByName: jest.fn(),
    getById: jest.fn(),
    create: jest.fn()
  }
}));

import { singleEnterpriseService } from "../../db/enterprise";

const mockClientService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
} as unknown as ClientService;

const controller = new ClientController(mockClientService);

describe("ClientController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllClients should return all clients", async () => {
    const clients = [{ id: 1 }];
    mockClientService.getAll = jest.fn().mockResolvedValue(clients);

    const result = await controller.getAllClients();
    expect(result).toEqual(clients);
    expect(mockClientService.getAll).toHaveBeenCalled();
  });

  test("getClientById should return a client", async () => {
    const client = { id: 1 };
    mockClientService.getById = jest.fn().mockResolvedValue(client);

    const result = await controller.getClientById(1);
    expect(result).toEqual(client);
    expect(mockClientService.getById).toHaveBeenCalledWith(1);
  });

  test("addClient should validate, check email, create enterprise if needed, and add client", async () => {
    const clientData = {
      nombre: "Cliente Nuevo",
      correo: "nuevo@correo.com",
      telefono: "1234567890",
      empresa: "Nueva Empresa"
    };

    mockClientService.getByEmail = jest.fn().mockResolvedValue(null);
    (singleEnterpriseService.getByName as jest.Mock).mockResolvedValue(null);
    (singleEnterpriseService.create as jest.Mock).mockResolvedValue({ id: 42 });
    mockClientService.create = jest.fn().mockResolvedValue({ id: 1 });

    const result = await controller.addClient(clientData);

    expect(mockClientService.getByEmail).toHaveBeenCalledWith("nuevo@correo.com");
    expect(singleEnterpriseService.getByName).toHaveBeenCalledWith("Nueva Empresa");
    expect(singleEnterpriseService.create).toHaveBeenCalledWith({ nombre: "Nueva Empresa" });
    expect(mockClientService.create).toHaveBeenCalledWith({
      idEmpresa: 42,
      nombre: "Cliente Nuevo",
      correo: "nuevo@correo.com",
      telefono: "1234567890"
    });

    expect(result).toEqual({ id: 1 });
  });

  test("addClient should throw if schema is invalid", async () => {
    const invalidData = { correo: "invalido" };

    await expect(controller.addClient(invalidData)).rejects.toThrow(
      "Los datos proporcionados no van acorde al esquema"
    );
  });

  test("addClient should throw if email already exists", async () => {
    const clientData = {
      nombre: "Ya existe",
      correo: "existe@correo.com",
      telefono: "123456789",
      empresa: "Empresa"
    };

    mockClientService.getByEmail = jest.fn().mockResolvedValue({ id: 1 });

    await expect(controller.addClient(clientData)).rejects.toThrow(
      "Ya hay un cliente asociado a esta cuenta"
    );
  });

  test("updateClient should validate, fetch current client, fetch enterprise, and update client", async () => {
    const updateData = {
      nombre: "Actualizado",
      correo: "act@correo.com",
      telefono: "999999999",
      empresa: "Empresa Actual"
    };

    mockClientService.getById = jest.fn().mockResolvedValue({ idEmpresa: 5 });
    (singleEnterpriseService.getById as jest.Mock).mockResolvedValue({ id: 5 });
    mockClientService.update = jest.fn().mockResolvedValue({ id: 10 });

    const result = await controller.updateClient(10, updateData);

    expect(mockClientService.update).toHaveBeenCalledWith(10, {
      idEmpresa: 5,
      ...updateData
    });

    expect(result).toEqual({ id: 10 });
  });
/*
  test("updateClient should create enterprise if not found", async () => {
    const updateData = {
      nombre: "Nuevo Nombre",
      correo: "nuevo@correo.com",
      telefono: "999",
      empresa: "Empresa Nueva"
    };

    mockClientService.getById = jest.fn().mockResolvedValue({ idEmpresa: 99 });
    (singleEnterpriseService.getById as jest.Mock).mockResolvedValue(null);
    (singleEnterpriseService.create as jest.Mock).mockResolvedValue({ id: 88 });
    mockClientService.update = jest.fn().mockResolvedValue({ id: 100 });

    const result = await controller.updateClient(100, updateData);

    expect(singleEnterpriseService.create).toHaveBeenCalledWith({ nombre: "Empresa Nueva" });
    expect(mockClientService.update).toHaveBeenCalledWith(100, {
      idEmpresa: 88,
      ...updateData
    });

    expect(result).toEqual({ id: 100 });
  });
*/
  test("updateClient should throw if schema is invalid", async () => {
    await expect(controller.updateClient(1, { mal: "dato" })).rejects.toThrow(
      "Los datos proporcionados no van acorde al schema"
    );
  });

  test("updateClient should throw if client does not exist", async () => {
    mockClientService.getById = jest.fn().mockResolvedValue(null);

    const data = {
      nombre: "X",
      correo: "x@y.com",
      telefono: "111",
      empresa: "E"
    };

    await expect(controller.updateClient(1, data)).rejects.toThrow(
      "No hay cliente asociado a este id"
    );
  });

  test("deleteClient should call service.delete", async () => {
    mockClientService.delete = jest.fn().mockResolvedValue(true);

    const result = await controller.deleteClient(12);
    expect(result).toBe(true);
    expect(mockClientService.delete).toHaveBeenCalledWith(12);
  });
});
