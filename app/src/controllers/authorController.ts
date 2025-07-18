import { Request, Response } from "express";
import { AuthorService } from "../services/authorService";
import { AuthorNotFoundException } from "../exceptions/authorNotFoundException";

export class AuthorController {
  private service: AuthorService;

  constructor() {
    this.service = new AuthorService();
  }

  createAuthor = async (req: Request, res: Response) => {
    try {
      const { authorName, authorBiography } = req.body;
      const author = await this.service.createAuthor(authorName, authorBiography);
      res.status(201).json(author);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to create author.", error: (error as Error).message });
    }
  };

  getAllAuthors = async (_req: Request, res: Response) => {
    try {
      const authors = await this.service.getAllAuthors();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query authors.", error: (error as Error).message });
    }
  };

  getAuthorByName = async (req: Request, res: Response) => {
    try {
      const { authorName } = req.params;
      const author = await this.service.getAuthorByName(authorName);
      res.status(200).json(author);
    } catch (error) {
      if (error instanceof AuthorNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to query author.", error: (error as Error).message });
      }
    }
  };

  updateAuthor = async (req: Request, res: Response) => {
    try {
      const { authorName } = req.params;
      const updatedData = req.body;
      const author = await this.service.updateAuthor(authorName, updatedData);
      res.status(200).json(author);
    } catch (error) {
      if (error instanceof AuthorNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to update author.", error: (error as Error).message });
      }
    }
  };

  deleteAuthor = async (req: Request, res: Response) => {
    try {
      const { authorName } = req.params;
      const deletedAuthor = await this.service.deleteAuthor(authorName);
      res.status(200).json({ message: "Author deleted successfully.", deletedAuthor });
    } catch (error) {
      if (error instanceof AuthorNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to delete author.", error: (error as Error).message });
      }
    }
  };
}
