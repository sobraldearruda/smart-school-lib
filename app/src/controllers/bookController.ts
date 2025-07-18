import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { BookNotFoundException } from "../exceptions/bookNotFoundException";

export class BookController {
  private service: BookService;

  constructor() {
    this.service = new BookService();
  }

  createBook = async (req: Request, res: Response) => {
    try {
      const { bookTitle, bookIsbn, bookPublicationYear } = req.body;
      const book = await this.service.createBook(bookTitle, bookIsbn, bookPublicationYear);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to create book.", error: (error as Error).message });
    }
  };

  getAllBooks = async (_req: Request, res: Response) => {
    try {
      const books = await this.service.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query books.", error: (error as Error).message });
    }
  };

  getBookByTitle = async (req: Request, res: Response) => {
    try {
      const { bookTitle } = req.params;
      const book = await this.service.getBookByTitle(bookTitle);
      res.status(200).json(book);
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to query book.", error: (error as Error).message });
      }
    }
  };

  updateBook = async (req: Request, res: Response) => {
    try {
      const { bookTitle } = req.params;
      const updatedData = req.body;
      const book = await this.service.updateBook(bookTitle, updatedData);
      res.status(200).json(book);
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to update book.", error: (error as Error).message });
      }
    }
  };

  deleteBook = async (req: Request, res: Response) => {
    try {
      const { bookTitle } = req.params;
      const deletedBook = await this.service.deleteBook(bookTitle);
      res.status(200).json({ message: "Book deleted successfully.", deletedBook });
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to delete book.", error: (error as Error).message });
      }
    }
  };
}
