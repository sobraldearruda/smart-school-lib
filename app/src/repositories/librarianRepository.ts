import { Librarian } from "../models/librarian";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class LibrarianRepository {

  async createLibrarian(userData: Partial<Librarian>): Promise<Librarian> {
    return Librarian.create(userData);
  }
  
  async getAllLibrarians() {
    return await Librarian.findAll();
  }
  
  async getLibrarianByRegistration(userRegistration: string): Promise<Librarian | null> {
    return await Librarian.findOne({ where: { userRegistration } });
  }
  
  async updateLibrarian(userRegistration: string, updatedData: Partial<Omit<Librarian, "userId">>): Promise<Librarian> {
    const librarian = await Librarian.findOne({ where: { userRegistration } });
    if (!librarian) {
      throw new UserNotFoundException(`Librarian with registration ${userRegistration} not found.`);
    }
    return await librarian.update(updatedData);
  }

  async deleteLibrarian(userRegistration: string): Promise<string> {
    return (await Librarian.destroy({ where: { userRegistration } })).toString();
  }
}
