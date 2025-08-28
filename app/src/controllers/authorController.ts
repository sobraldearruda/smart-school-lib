import { Request, Response } from "express";
import { IAuthorService } from "../services/interfaces/iAuthorService";

export class AuthorController {
  
  private service: IAuthorService;

  constructor(service: IAuthorService) {
    this.service = service;
  }

  createAuthor = async (req: Request, res: Response) => {
    try {
      const { authorName, authorBiography } = req.body;
      const author = await this.service.createAuthor(authorName, authorBiography);
      res.status(201).json(author);
    } catch (error: any) {
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      if (error.message === "Permission denied") {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === "Validation error") {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  getAllAuthors = async (_req: Request, res: Response) => {
    try {
      const authors = await this.service.getAllAuthors();
      res.status(200).json(authors);
    } catch (error: any) {
      if (error.message === "Validation error") {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === "No authors found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  getAuthorByName = async (req: Request, res: Response) => {
    try {
      const { authorName } = req.params;
      const author = await this.service.getAuthorByName(authorName);
      res.status(200).json(author);
    } catch (error: any) {
      if (error.message === "Validation error") {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === "Author not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  updateAuthor = async (req: Request, res: Response) => {
    try {
      const { authorName } = req.params;
      const updatedData = req.body;
      const author = await this.service.updateAuthor(authorName, updatedData);
      res.status(200).json(author);
    } catch (error: any) {
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      if (error.message === "Permission denied") {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === "Validation error") {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === "Author not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  deleteAuthor = async (req: Request, res: Response) => {
    try {
      const { authorName } = req.params;
      const deletedAuthor = await this.service.deleteAuthor(authorName);
      res.status(204).json({ message: "Author deleted successfully.", deletedAuthor });
    } catch (error: any) {
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      if (error.message === "Permission denied") {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === "Author not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };
  
}
