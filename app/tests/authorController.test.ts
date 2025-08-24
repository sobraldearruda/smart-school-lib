import { AuthorController } from "../src/controllers/authorController";
import { IAuthorService } from "../src/services/interfaces/iAuthorService";
import { Request, Response } from "express";

describe("AuthorController (Unit Test)", () => {
  let authorService: jest.Mocked<IAuthorService>;
  let authorController: AuthorController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    authorService = {
      createAuthor: jest.fn(),
      getAllAuthors: jest.fn(),
      getAuthorByName: jest.fn(),
      updateAuthor: jest.fn(),
      deleteAuthor: jest.fn(),
    };

    authorController = new AuthorController(authorService);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  const mockAuthor = {
    authorId: 1,
    authorName: "Conceição Evaristo",
    authorBiography: "A Brazilian writer and activist, Conceição Evaristo's work often explores themes of race, class, gender, and identity in Brazil.",
  } as any;

  // createAuthor
  it("should create an author successfully", async () => {
    // Arrange
    req = { body: mockAuthor };
    authorService.createAuthor.mockResolvedValue(mockAuthor);

    // Act
    await authorController.createAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAuthor);
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    // Arrange
    req = { body: mockAuthor };
    authorService.createAuthor.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await authorController.createAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 400 when creating with invalid data", async () => {
    // Arrange
    req = { body: { ...mockAuthor, authorName: "" } };
    authorService.createAuthor.mockRejectedValue(new Error("Validation error"));

    // Act
    await authorController.createAuthor(req as Request, res as Response);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 for a generic creation error", async () => {
    // Arrange
    req = { body: mockAuthor };
    authorService.createAuthor.mockRejectedValue(new Error("Database connection failed"));
    
    // Act
    await authorController.createAuthor(req as Request, res as Response);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getAllAuthors
  it("should return all authors successfully", async () => {
    // Arrange
    const authors = [mockAuthor];
    authorService.getAllAuthors.mockResolvedValue(authors);

    // Act
    await authorController.getAllAuthors({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(authors);
  });

  it("should return 500 when query failed", async () => {
    // Arrange
    authorService.getAllAuthors.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await authorController.getAllAuthors({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getAuthorByName
  it("should return an author by name", async () => {
    // Arrange
    req = { params: { authorName: "Conceição Evaristo" } };
    authorService.getAuthorByName.mockResolvedValue(mockAuthor);

    // Act
    await authorController.getAuthorByName(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAuthor);
  });

  it("should return 404 when author not found", async () => {
    // Arrange
    req = { params: { authorName: "Chimamanda Ngozi Adichie" } };
    authorService.getAuthorByName.mockRejectedValue(new Error("Author not found"));

    // Act
    await authorController.getAuthorByName(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Author not found" });
  });

  it("should return 500 for unexpected error", async () => {
    // Arrange
    req = { params: { authorName: "Audre Lorde" } };
    authorService.getAuthorByName.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await authorController.getAuthorByName(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // updateAuthor
  it("should update author successfully", async () => {
    // Arrange
    req = { params: { authorName: "Conceição Evaristo" }, body: { authorBiography: "An awarded feminist African Brazilian writer." } };
    const updatedAuthor = { ...mockAuthor, authorBiography: "An awarded feminist African Brazilian writer." };
    authorService.updateAuthor.mockResolvedValue(updatedAuthor);

    // Act
    await authorController.updateAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedAuthor);
  });

  it("should return 404 when author not found", async () => {
    // Arrange
    req = { params: { authorName: "Mãe Beata de Yemonjá" }, body: { authorBiography: "An awarded feminist African Brazilian writer." } };
    authorService.updateAuthor.mockRejectedValue(new Error("Author not found"));

    // Act
    await authorController.updateAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Author not found" });
  });

  it("should return 500 when update failed", async () => {
    // Arrange
    req = { params: { authorName: "Caio Fernando Abreu" }, body: { authorBiography: "An awarded Brazilian queer writer." } };
    authorService.updateAuthor.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await authorController.updateAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "invalid.update@email.com" } };
    authorService.updateAuthor.mockRejectedValue(new Error("Permission denied"));

    // Act
    await authorController.updateAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "update@email.com" } };
    authorService.updateAuthor.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await authorController.updateAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteAuthor
  it("should delete author successfully", async () => {
    // Arrange
    req = { params: { authorName: "Conceição Evaristo" } };
    authorService.deleteAuthor.mockResolvedValue(mockAuthor);

    // Act
    await authorController.deleteAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Author deleted successfully.",
      deletedAuthor: mockAuthor,
    });
  });

  it("should return 404 when deletion does not find author", async () => {
    // Arrange
    req = { params: { authorName: "Itamar Vieira Junior" } };
    authorService.deleteAuthor.mockRejectedValue(new Error("Author not found"));

    // Act
    await authorController.deleteAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Author not found" });
  });

  it("should return 500 when deletion failed", async () => {
    // Arrange
    req = { params: { authorName: "Amara Moira" } };
    authorService.deleteAuthor.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await authorController.deleteAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    authorService.deleteAuthor.mockRejectedValue(new Error("Permission denied"));

    // Act
    await authorController.deleteAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    authorService.deleteAuthor.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await authorController.deleteAuthor(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });
  
});
