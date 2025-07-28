import { Request, Response } from "express";
import { LibrarianService } from "../services/librarianService";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class LibrarianController {

  private LibrarianService: LibrarianService;

  constructor(LibrarianService: LibrarianService) {
    this.LibrarianService = LibrarianService;
  }

  async createLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const librarian = await this.LibrarianService.createLibrarian(userData);
      return res.status(201).json(librarian);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllLibrarians(req: Request, res: Response): Promise<Response> {
    try {
      const librarians = await this.LibrarianService.getAllLibrarians();
      return res.json(librarians);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getLibrarianByRegistration(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.body;
      const librarian = await this.LibrarianService.getLibrarianByRegistration(userRegistration);
      return res.json(librarian);
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async updateLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const updatedData = req.body;
      const { userRegistration } = req.body;
      const librarian = await this.LibrarianService.updateLibrarian(userRegistration, updatedData);
      return res.json(librarian);
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.body;
      const deletedLibrarian = await this.LibrarianService.deleteLibrarian(userRegistration);
      return res.json({ message: "Librarian deleted successfully.", deletedLibrarian });
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async loginLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration, userPassword } = req.body;
      const authResult = await this.LibrarianService.authenticate(userRegistration, userPassword);
      return res.json(authResult);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
