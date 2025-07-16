import { Request, Response } from "express";
import { LibrarianService } from "../services/librarianService";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class LibrarianController {
  private service: LibrarianService;

  constructor() {
    this.service = new LibrarianService();
  }

  createLibrarian = async (req: Request, res: Response) => {
    try {
      const { userName, userEmail, userRegistration } = req.body;
      const librarian = await this.service.createLibrarian(userName, userEmail, userRegistration);
      res.status(201).json(librarian);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to create user.", error: (error as Error).message });
    }
  };

  getAllLibrarians = async (_req: Request, res: Response) => {
    try {
      const librarians = await this.service.getAllLibrarians();
      res.status(200).json(librarians);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query users.", error: (error as Error).message });
    }
  };

  getLibrarianByRegistration = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const librarian = await this.service.getLibrarianByRegistration(userRegistration);
      res.status(200).json(librarian);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to query user.", error: (error as Error).message });
      }
    }
  };

  updateLibrarian = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const updatedData = req.body;
      const librarian = await this.service.updateLibrarian(userRegistration, updatedData);
      res.status(200).json(librarian);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to update user.", error: (error as Error).message });
      }
    }
  };

  deleteLibrarian = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const deletedLibrarian = await this.service.deleteLibrarian(userRegistration);
      res.status(200).json({ message: "Teacher deleted successfully.", deletedLibrarian });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to delete user.", error: (error as Error).message });
      }
    }
  };
}
