import { BookController } from "../src/controllers/bookController";
import { IBookService } from "../src/services/interfaces/iBookService";
import { Request, Response } from "express";

describe("BookController (Unit Test)", () => {
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
    req = { body: mockBook };
    bookService.createBook.mockResolvedValue(mockBook);

    await bookController.createBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it("should return 400 when creation failed", async () => {
    req = { body: mockBook };
    bookService.createBook.mockRejectedValue(new Error("Invalid data"));

    await bookController.createBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid data" });
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    req = { body: mockBook };
    bookService.createBook.mockRejectedValue(new Error("Not authenticated"));

    await bookController.createBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // getAllBooks
  it("should return all books successfully", async () => {
    const books = [mockBook];
    bookService.getAllBooks.mockResolvedValue(books);

    await bookController.getAllBooks({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(books);
  });

  it("should return 500 when query failed", async () => {
    bookService.getAllBooks.mockRejectedValue(new Error("Database error"));

    await bookController.getAllBooks({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
  });

  // getBookByTitle
  it("should return a book by title", async () => {
    req = { params: { bookTitle: "Narratives: poems in the tradition of black women" } };
    bookService.getBookByTitle.mockResolvedValue(mockBook);

    await bookController.getBookByTitle(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it("should return 404 when book not found", async () => {
    req = { params: { bookTitle: "The collected poems of Audre Lorde" } };
    bookService.getBookByTitle.mockRejectedValue(new Error("Book not found"));

    await bookController.getBookByTitle(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 500 for unexpected error", async () => {
    req = { params: { bookTitle: "Morangos Mofados" } };
    bookService.getBookByTitle.mockRejectedValue(new Error("Database failure"));

    await bookController.getBookByTitle(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  // updateBook
  it("should update a book successfully", async () => {
    req = { params: { bookTitle: "Narratives: poems in the tradition of black women" }, body: { bookPublicationYear: 2025 } };
    const updatedBook = { ...mockBook, bookPublicationYear: 2025 };
    bookService.updateBook.mockResolvedValue(updatedBook);

    await bookController.updateBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedBook);
  });

  it("should return 404 when book not found", async () => {
    req = { params: { bookTitle: "Ideias para adiar o fim do mundo" }, body: { bookPublicationYear: 2019 } };
    bookService.updateBook.mockRejectedValue(new Error("Book not found"));

    await bookController.updateBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 500 when update failed", async () => {
    req = { params: { bookTitle: "Narratives: poems in the tradition of black women" }, body: { bookPublicationYear: 1982 } };
    bookService.updateBook.mockRejectedValue(new Error("Database failure"));

    await bookController.updateBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "invalid.update@email.com" } };
    bookService.updateBook.mockRejectedValue(new Error("Permission denied"));

    await bookController.updateBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "update@email.com" } };
    bookService.updateBook.mockRejectedValue(new Error("Not authenticated"));

    await bookController.updateBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteBook
  it("should delete a book successfully", async () => {
    req = { params: { bookTitle: "Narratives: poems in the tradition of black women" } };
    bookService.deleteBook.mockResolvedValue(mockBook);

    await bookController.deleteBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Book deleted successfully.",
      deletedBook: mockBook,
    });
  });

  it("should return 404 when deletion does not find book", async () => {
    req = { params: { bookTitle: "Jimmy's blues and other poems" } };
    bookService.deleteBook.mockRejectedValue(new Error("Book not found"));

    await bookController.deleteBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 500 when deletion failed", async () => {
    req = { params: { bookTitle: "A queda do céu: palavras de um xamã yanomami" } };
    bookService.deleteBook.mockRejectedValue(new Error("Database failure"));

    await bookController.deleteBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    req = { params: { userRegistration: "12345" } };
    bookService.deleteBook.mockRejectedValue(new Error("Permission denied"));

    await bookController.deleteBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    req = { params: { userRegistration: "12345" } };
    bookService.deleteBook.mockRejectedValue(new Error("Not authenticated"));

    await bookController.deleteBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

});
