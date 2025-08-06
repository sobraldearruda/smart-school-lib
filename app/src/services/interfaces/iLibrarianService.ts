import { Librarian } from "../../models/librarian";

export interface ILibrarianService {
  createLibrarian(userData: any): Promise<Librarian>;
  getAllLibrarians(): Promise<Librarian[]>;
  getLibrarianByRegistration(userRegistration: string): Promise<Librarian>;
  updateLibrarian(userRegistration: string, updatedData: Partial<Omit<Librarian, "userId">>): Promise<Librarian>;
  deleteLibrarian(userRegistration: string): Promise<Librarian | string>;
  authenticate(userRegistration: string, userPassword: string): Promise<{ user: Librarian, token: string }>;
}
