import { BookController } from "../src/controllers/bookController";
import { IBookService } from "../src/services/interfaces/iBookService";
import { Request, Response } from "express";

describe("BookController (Unit Tests)", () => {
  let bookService: jest.Mocked<IBookService>;
  let bookController: BookController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    bookService = {
      createBook: jest.fn(),
      getAllBooks: jest.fn(),
      getBookByTitle: jest.fn(),
      updateBook: jest.fn(),
      deleteBook: jest.fn(),
    };

    bookController = new BookController(bookService);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  const mockBook = {
    bookId: 1,
    bookTitle: "Narratives: poems in the tradition of black women",
    bookIsbn: "123456789",
    bookPublicationYear: 1982,
    bookAuthors: ["Cheryl Clarke"],
  } as any;

  // createBook
  it("should create a book successfully", async () => {
    // Arrange
    req = { body: mockBook };
    bookService.createBook.mockResolvedValue(mockBook);

    // Act
    await bookController.createBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    // Arrange
    req = { body: mockBook };
    bookService.createBook.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await bookController.createBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 403 when user is unauthorized to create", async () => {
    // Arrange
    req = { body: mockBook };
    bookService.createBook.mockRejectedValue(new Error("Permission denied"));

    // Act
    await bookController.createBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 400 when creating with invalid data", async () => {
    // Arrange
    req = { body: { ...mockBook, bookTitle: "" } };
    bookService.createBook.mockRejectedValue(new Error("Validation error"));

    // Act
    await bookController.createBook(req as Request, res as Response);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 for a generic creation error", async () => {
    // Arrange
    req = { body: mockBook };
    bookService.createBook.mockRejectedValue(new Error("Database connection failed"));
    
    // Act
    await bookController.createBook(req as Request, res as Response);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getAllBooks
  it("should return all books successfully", async () => {
    // Arrange
    req = { body: [mockBook] };
    bookService.getAllBooks.mockResolvedValue(req.body as any);

    // Act
    await bookController.getAllBooks(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockBook]);
  });

  it("should return 400 when validation error occurs in query", async () => {
    // Arrange
    req = { body : [!mockBook.bookTitle] };
    bookService.getAllBooks.mockRejectedValue(new Error("Validation error"));

    // Act
    await bookController.getAllBooks(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 404 when no books found", async () => {
    // Arrange
    req = { body : [] };
    bookService.getAllBooks.mockRejectedValue(new Error("No books found"));

    // Act
    await bookController.getAllBooks({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No books found" });
  });

  it("should return 500 when query failed", async () => {
    // Arrange
    req = { body : [mockBook] };
    bookService.getAllBooks.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await bookController.getAllBooks(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getBookByTitle
  it("should return a book by title", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle } };
    bookService.getBookByTitle.mockResolvedValue(mockBook);

    // Act
    await bookController.getBookByTitle(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it("should return 404 when book not found", async () => {
    // Arrange
    req = { params: { bookTitle: "The collected poems of Audre Lorde" } };
    bookService.getBookByTitle.mockRejectedValue(new Error("Book not found"));

    // Act
    await bookController.getBookByTitle(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 400 when validation error occurs in query", async () => {
    // Arrange
    req = { params: { bookTitle: "" } };
    bookService.getBookByTitle.mockRejectedValue(new Error("Validation error"));

    // Act
    await bookController.getBookByTitle(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 for unexpected error in query", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle } };
    bookService.getBookByTitle.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await bookController.getBookByTitle(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // updateBook
  it("should update a book successfully", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle }, body: { bookPublicationYear: 2025 } };
    const updatedBook = { ...mockBook, bookPublicationYear: 2025 };
    bookService.updateBook.mockResolvedValue(updatedBook);

    // Act
    await bookController.updateBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedBook);
  });

  it("should return 404 when book not found", async () => {
    // Arrange
    req = { params: { bookTitle: "Ideias para adiar o fim do mundo" }, body: { bookPublicationYear: 2019 } };
    bookService.updateBook.mockRejectedValue(new Error("Book not found"));

    // Act
    await bookController.updateBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 400 when validation error occurs in update", async () => {
    // Arrange
    req = { params: { bookTitle: "" } };
    bookService.updateBook.mockRejectedValue(new Error("Validation error"));

    // Act
    await bookController.updateBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 when update failed", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle }, body: { bookPublicationYear: 1982 } };
    bookService.updateBook.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await bookController.updateBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle }, body: { bookPublicationYear: 2025 } };
    bookService.updateBook.mockRejectedValue(new Error("Permission denied"));

    // Act
    await bookController.updateBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle }, body: { bookPublicationYear: 2025 } };
    bookService.updateBook.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await bookController.updateBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteBook
  it("should delete a book successfully", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle } };
    bookService.deleteBook.mockResolvedValue(mockBook);

    // Act
    await bookController.deleteBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Book deleted successfully.",
      deletedBook: mockBook,
    });
  });

  it("should return 404 when deletion does not find book", async () => {
    // Arrange
    req = { params: { bookTitle: "Jimmy's blues and other poems" } };
    bookService.deleteBook.mockRejectedValue(new Error("Book not found"));

    // Act
    await bookController.deleteBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 400 when validation error occurs in deletion", async () => {
    // Arrange
    req = { params: { bookTitle: "" } };
    bookService.deleteBook.mockRejectedValue(new Error("Validation error"));

    // Act
    await bookController.deleteBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 when unexpected error in deletion", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle } };
    bookService.deleteBook.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await bookController.deleteBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle } };
    bookService.deleteBook.mockRejectedValue(new Error("Permission denied"));

    // Act
    await bookController.deleteBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    // Arrange
    req = { params: { bookTitle: mockBook.bookTitle } };
    bookService.deleteBook.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await bookController.deleteBook(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

});
