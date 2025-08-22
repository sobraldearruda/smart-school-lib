import { Request, Response } from "express";
import { ILibrarianService } from "../services/interfaces/iLibrarianService";

export class LibrarianController {

  private librarianService: ILibrarianService;

  constructor(service: ILibrarianService) {
    this.librarianService = service;
  }

  async createLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const librarian = await this.librarianService.createLibrarian(userData);
      return res.status(201).json(librarian);
    } catch (error: any) {
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllLibrarians(req: Request, res: Response): Promise<Response> {
    try {
      const librarians = await this.librarianService.getAllLibrarians();
      return res.status(200).json(librarians);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getLibrarianByRegistration(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.params;
      const librarian = await this.librarianService.getLibrarianByRegistration(userRegistration);
      return res.status(200).json(librarian);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async updateLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const updatedData = req.body;
      const { userRegistration } = req.params;
      const librarian = await this.librarianService.updateLibrarian(userRegistration, updatedData);
      return res.status(200).json(librarian);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === "Permission denied") {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.params;
      const deletedLibrarian = await this.librarianService.deleteLibrarian(userRegistration);
      return res.status(204).json({ message: "Librarian deleted successfully.", deletedLibrarian });
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === "Permission denied") {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async loginLibrarian(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration, userPassword } = req.params;
      const authResult = await this.librarianService.authenticate(userRegistration, userPassword);
      return res.status(200).json(authResult);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
