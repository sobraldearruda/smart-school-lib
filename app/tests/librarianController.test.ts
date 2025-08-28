import { LibrarianController } from "../src/controllers/librarianController";
import { ILibrarianService } from "../src/services/interfaces/iLibrarianService";
import { Request, Response } from "express";

describe("LibrarianController (Unit Tests)", () => {
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

  it("should return 403 when user has no permission to creation", async () => {
    req = { body: mockLibrarian };
    librarianService.createLibrarian.mockRejectedValue(new Error("Permission denied"));

    await librarianController.createLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
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
    req = { body: [mockLibrarian] };
    librarianService.getAllLibrarians.mockResolvedValue(req.body as any);

    // Act
    await librarianController.getAllLibrarians(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockLibrarian]);
  });

  it("should return 401 when not authenticated to list librarians", async () => {
    // Arrange
    req = { body: [mockLibrarian] };
    librarianService.getAllLibrarians.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await librarianController.getAllLibrarians(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 403 when permission denied to list librarians", async () => {
    // Arrange
    req = { body: [mockLibrarian] };
    librarianService.getAllLibrarians.mockRejectedValue(new Error("Permission denied"));

    // Act
    await librarianController.getAllLibrarians(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 404 when no librarians found", async () => {
    // Arrange
    req = { body: [mockLibrarian] };
    librarianService.getAllLibrarians.mockRejectedValue(new Error("No user found"));

    // Act
    await librarianController.getAllLibrarians(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No user found" });
  });

  it("should return 500 when unexpected error in query", async () => {
    // Arrange
    req = { body: [mockLibrarian] };
    librarianService.getAllLibrarians.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await librarianController.getAllLibrarians(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getLibrarianByRegistration
  it("should return a librarian by registration", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
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

  it("should return 401 when not authenticated to get librarian", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
    librarianService.getLibrarianByRegistration.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 403 when permission denied to get librarian", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
    librarianService.getLibrarianByRegistration.mockRejectedValue(new Error("Permission denied"));

    // Act
    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 400 when validation error occurs", async () => {
    req = { params: { userRegistration: "" } };
    librarianService.getLibrarianByRegistration.mockRejectedValue(new Error("Validation error"));

    await librarianController.getLibrarianByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 for unexpected error in query", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
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
    req = { params: { userRegistration: mockLibrarian.userRegistration }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
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

  it("should return 500 when unexpected error in updating", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration }, body: { userEmail: "invalid.update@email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Permission denied"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration }, body: { userEmail: "update@email.com" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 400 when validation error occurs on update", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration }, body: { userEmail: "" } };
    librarianService.updateLibrarian.mockRejectedValue(new Error("Validation error"));

    // Act
    await librarianController.updateLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  // deleteLibrarian
  it("should delete librarian successfully", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
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

  it("should return 500 when unexpected error in deletion", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Permission denied"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 400 when validation error occurs on deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "" } };
    librarianService.deleteLibrarian.mockRejectedValue(new Error("Validation error"));

    // Act
    await librarianController.deleteLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  // loginLibrarian
  it("should login librarian successfully", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration, userPassword: mockLibrarian.userPassword } };
    const token = { token: "abc123" };
    librarianService.authenticate.mockResolvedValue(token as any);

    // Act
    await librarianController.loginLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "abc123" });
  });

  it("should return 400 when login data is invalid", async () => {
    // Arrange
    req = { params: { userRegistration: mockLibrarian.userRegistration, userPassword: "" } };
    librarianService.authenticate.mockRejectedValue(new Error("Validation error"));

    // Act
    await librarianController.loginLibrarian(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 when unexpected login error occurs", async () => {
    req = { params: { userRegistration: mockLibrarian.userRegistration, userPassword: "54321" } };
    librarianService.authenticate.mockRejectedValue(new Error("Database connection failed"));

    await librarianController.loginLibrarian(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });
  
});
