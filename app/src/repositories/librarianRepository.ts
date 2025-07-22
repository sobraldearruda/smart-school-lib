import { Librarian } from "../models/librarian";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class LibrarianRepository {

  async createLibrarian(userName: string, userEmail: string, userRegistration: string) {
    const librarian =  await Librarian.create({
      userName,
      userEmail,
      userRegistration
    });
    return librarian;
  }
  
  async getAllLibrarians() {
    return await Librarian.findAll();
  }
  
  async getLibrarianByRegistration(userRegistration: string) {
    const librarian = await Librarian.findOne({ where: { userRegistration } });
    if (!librarian) {
      throw new UserNotFoundException(`Librarian with registration ${userRegistration} not found.`);
    }
    return librarian;
  }
  
  async updateLibrarian(userRegistration: string, updatedData: Partial<Omit<Librarian, "userId">>) {
    const librarian = await Librarian.findOne({ where: { userRegistration } });
    if (!librarian) {
      throw new UserNotFoundException(`Librarian with registration ${userRegistration} not found.`);
    }
    return await librarian.update(updatedData);
  }

  async deleteLibrarian(userRegistration: string) {
    const librarian = await Librarian.findOne({ where: { userRegistration } });
    if (!librarian) {
      throw new UserNotFoundException(`Librarian with registration ${userRegistration} not found.`);
    }
    await librarian.destroy();
    return librarian;
  }
}
