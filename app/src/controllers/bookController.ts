import { Request, Response } from "express";
import { IBookService } from "../services/interfaces/iBookService";

export class BookController {
  
  private service: IBookService;

  constructor(service: IBookService) {
    this.service = service;
  }

  createBook = async (req: Request, res: Response) => {
    try {
      const { bookTitle, bookIsbn, bookPublicationYear, bookAuthors } = req.body;
      const book = await this.service.createBook(bookTitle, bookIsbn, bookPublicationYear, bookAuthors);
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
      if (error instanceof Error && error.message === "Book not found") {
        return res.status(404).json({ message: error.message });
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
      if (error instanceof Error && error.message === "Book not found") {
        return res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to update book.", error: (error as Error).message });
      }
    }
  };

  deleteBook = async (req: Request, res: Response) => {
    try {
      const { bookTitle } = req.params;
      const deletedBook = await this.service.deleteBook(bookTitle);
      res.status(204).json({ message: "Book deleted successfully.", deletedBook });
    } catch (error) {
      if (error instanceof Error && error.message === "Book not found") {
        return res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to delete book.", error: (error as Error).message });
      }
    }
  };
}
