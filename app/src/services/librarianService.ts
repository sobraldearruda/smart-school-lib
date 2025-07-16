import { LibrarianRepository } from "../repositories/librarianRepository";
import { Librarian } from "../models/librarian";
import { UserNotFoundException } from "../exceptions/userNotFoundException";
import { DuplicateRegistrationException } from "../exceptions/duplicateRegistrationException";

export class LibrarianService {
  private repository: LibrarianRepository;

  constructor() {
    this.repository = new LibrarianRepository();
  }

  async createLibrarian(userName: string, userEmail: string, userRegistration: string): Promise<Librarian> {
    try {
      const existing = await this.repository.getLibrarianByRegistration(userRegistration);
      if (existing) {
        throw new DuplicateRegistrationException(`Registration ${userRegistration} already in use.`);
      }
    } catch (error) {
      if (!(error instanceof UserNotFoundException)) {
        throw error;
      }
    }
    if (!userName || !userEmail || !userRegistration) {
      throw new Error("All fields required.");
    }
    return await this.repository.createLibrarian(userName.trim(), userEmail.trim(), userRegistration.trim());
  }

  async getAllLibrarians(): Promise<Librarian[]> {
    return await this.repository.getAllLibrarians();
  }

  async getLibrarianByRegistration(userRegistration: string): Promise<Librarian> {
    return await this.repository.getLibrarianByRegistration(userRegistration);
  }

  async updateLibrarian(userRegistration: string, updatedData: Partial<Omit<Librarian, "userId">>): Promise<Librarian> {
    if (Object.keys(updatedData).length === 0) {
      throw new Error("No content informed.");
    }
    return await this.repository.updateLibrarian(userRegistration, updatedData);
  }

  async deleteLibrarian(userRegistration: string): Promise<Librarian> {
    return await this.repository.deleteLibrarian(userRegistration);
  }
}
