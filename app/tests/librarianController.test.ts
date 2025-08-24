import { LibrarianController } from "../src/controllers/librarianController";
import { ILibrarianService } from "../src/services/interfaces/iLibrarianService";
import { Request, Response } from "express";

describe("LibrarianController (Unit Test)", () => {
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
    // Arrange
    req = { body: mockLibrarian };
    librarianService.createLibrarian.mockResolvedValue(mockLibrarian);

    // Act
    await librarianController.createLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockLibrarian);
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    // Arrange
    req = { body: mockLibrarian };
    librarianService.createLibrarian.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await librarianController.createLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 400 when creating with invalid data", async () => {
    // Arrange
    req = { body: { ...mockLibrarian, userEmail: "" } };
    librarianService.createLibrarian.mockRejectedValue(new Error("Validation error"));

    // Act    
    await librarianController.createLibrarian(req as Request, res as Response);

    // Assert    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 for a generic creation error", async () => {
    // Arrange
    req = { body: mockLibrarian };
    librarianService.createLibrarian.mockRejectedValue(new Error("Database connection failed"));

    // Act    
    await librarianController.createLibrarian(req as Request, res as Response);

    // Assert    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getAllLibrarians
  it("should return all librarians successfully", async () => {
    // Arrange
    const librarians = [mockLibrarian];
    librarianService.getAllLibrarians.mockResolvedValue(librarians);

    // Act
    await librarianController.getAllLibrarians({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(librarians);
  });

  it("should return 500 when query failed", async () => {
    // Arrange
    librarianService.getAllLibrarians.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await librarianController.getAllLibrarians({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getLibrarianByRegistration
  it("should return a librarian by registration", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    librarianService.getLibrarianByRegistration.mockResolvedValue(mockLibrarian);

    // Act
    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLibrarian);
  });

  it("should return 404 when query not found", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    librarianService.getLibrarianByRegistration.mockRejectedValue(new Error("User not found"));

    // Act
    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 for unexpected error", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    librarianService.getLibrarianByRegistration.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // updateLibrarian
  it("should update librarian successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    const updatedlibrarian = { ...mockLibrarian, userEmail: "rafael.sobral@ufcg.email.com" };
    librarianService.updateLibrarian.mockResolvedValue(updatedlibrarian);

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedlibrarian);
  });

  it("should return 404 when user not found", async () => {
    // Arrange
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("User not found"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when update failed", async () => {
    // Arrange
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "invalid.update@email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Permission denied"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "update@email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteLibrarian
  it("should delete librarian successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockResolvedValue(mockLibrarian);

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Librarian deleted successfully.",
      deletedLibrarian: mockLibrarian,
    });
  });

  it("should return 404 when deletion does not find user", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("User not found"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when deletion failed", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Permission denied"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // loginLibrarian
  it("should login librarian successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345", userPassword: "54321" } };
    const token = { token: "abc123" };
    librarianService.authenticate.mockResolvedValue(token as any);

    // Act
    await librarianController.loginLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "abc123" });
  });

  it("should return 401 when failed", async () => {
    // Arrange
    req = { params: { userRegistration: "123", userPassword: "pass" } };
    librarianService.authenticate.mockRejectedValue(new Error("Invalid credentials"));

    // Act
    await librarianController.loginLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
  
});
