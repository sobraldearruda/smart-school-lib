import { LibrarianController } from "../src/controllers/librarianController";
import { ILibrarianService } from "../src/services/interfaces/iLibrarianService";
import { Request, Response } from "express";

describe("LibrarianController", () => {
  let librarianService: jest.Mocked<ILibrarianService>;
  let librarianController: LibrarianController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    librarianService = {
      createLibrarian: jest.fn(),
      getAllLibrarians: jest.fn(),
      getLibrarianByRegistration: jest.fn(),
      updateLibrarian: jest.fn(),
      deleteLibrarian: jest.fn(),
      authenticate: jest.fn(),
    };

    librarianController = new LibrarianController(librarianService);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  const mockLibrarian = {
    userId: 1,
    userName: "Rafael Sobral",
    userEmail: "rafael.sobral@email.com",
    userRegistration: "12345",
    userPassword: "54321",
  } as any;

  // createLibrarian
  it("should create a librarian successfully", async () => {
    req = { body: mockLibrarian };
    librarianService.createLibrarian.mockResolvedValue(mockLibrarian);

    await librarianController.createLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockLibrarian);
  });

  it("should return 400 when creation failed", async () => {
    req = { body: mockLibrarian };
    librarianService.createLibrarian.mockRejectedValue(new Error("Invalid data"));

    await librarianController.createLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid data" });
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    req = { body: mockLibrarian };
    librarianService.createLibrarian.mockRejectedValue(new Error("Not authenticated"));

    await librarianController.createLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // getAllLibrarians
  it("should return all librarians successfully", async () => {
    const librarians = [mockLibrarian];
    librarianService.getAllLibrarians.mockResolvedValue(librarians);

    await librarianController.getAllLibrarians({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(librarians);
  });

  it("should return 500 when query failed", async () => {
    librarianService.getAllLibrarians.mockRejectedValue(new Error("Database error"));

    await librarianController.getAllLibrarians({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
  });

  // getLibrarianByRegistration
  it("should return a librarian by registration", async () => {
    req = { params: { userRegistration: "123" } };
    librarianService.getLibrarianByRegistration.mockResolvedValue(mockLibrarian);

    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLibrarian);
  });

  it("should return 404 when query not found", async () => {
    req = { params: { userRegistration: "123" } };
    librarianService.getLibrarianByRegistration.mockRejectedValue(new Error("User not found"));

    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 for unexpected error", async () => {
    req = { params: { userRegistration: "123" } };
    librarianService.getLibrarianByRegistration.mockRejectedValue(new Error("Database failure"));

    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  // updateLibrarian
  it("should update librarian successfully", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    const updatedlibrarian = { ...mockLibrarian, userEmail: "rafael.sobral@ufcg.email.com" };
    librarianService.updateLibrarian.mockResolvedValue(updatedlibrarian);

    await librarianController.updateLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedlibrarian);
  });

  it("should return 404 when user not found", async () => {
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("User not found"));

    await librarianController.updateLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when update failed", async () => {
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Database failure"));

    await librarianController.updateLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "invalid.update@email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Permission denied"));

    await librarianController.updateLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "update@email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Not authenticated"));

    await librarianController.updateLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteLibrarian
  it("should delete librarian successfully", async () => {
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockResolvedValue(mockLibrarian);

    await librarianController.deleteLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Librarian deleted successfully.",
      deletedLibrarian: mockLibrarian,
    });
  });

  it("should return 404 when deletion does not find user", async () => {
    req = { params: { userRegistration: "123" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("User not found"));

    await librarianController.deleteLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when deletion failed", async () => {
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Database failure"));

    await librarianController.deleteLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Permission denied"));

    await librarianController.deleteLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Not authenticated"));

    await librarianController.deleteLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // loginLibrarian
  it("should login librarian successfully", async () => {
    req = { params: { userRegistration: "12345", userPassword: "54321" } };
    const token = { token: "abc123" };
    librarianService.authenticate.mockResolvedValue(req as any);

    await librarianController.loginLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      params: { userRegistration: "12345", userPassword: "54321" }
    });
  });

  it("should return 401 when failed", async () => {
    req = { params: { userRegistration: "123", userPassword: "pass" } };
    librarianService.authenticate.mockRejectedValue(new Error("Invalid credentials"));

    await librarianController.loginLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
  
});
