import { LibrarianRepository } from "../../repositories/librarianRepository";
import { Librarian } from "../../models/librarian";
import { DuplicateRegistrationException } from "../../exceptions/duplicateRegistrationException";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ILibrarianService } from "../interfaces/iLibrarianService";

export class LibrarianService implements ILibrarianService {

  private repository = new LibrarianRepository();
  private jwtSecret: jwt.Secret = (process.env.JWT_SECRET || "defaultSecret") as jwt.Secret;

  private validateUserData(userData: any) {
    if (!userData.userName || !userData.userEmail || !userData.userRegistration || !userData.userPassword) {
      throw new Error("All fields required.");
    }
  }

  async createLibrarian(userData: any): Promise<Librarian> {
    const existing = await this.repository.getLibrarianByRegistration(userData.userRegistration);
    if (existing) throw new DuplicateRegistrationException(`Registration ${userData.userRegistration} already in use.`);
    this.validateUserData(userData);
    const hashedPassword = await bcrypt.hash(userData.userPassword, 10);
    const userWithHashedPass = { ...userData, userPassword: hashedPassword };
    return await this.repository.createLibrarian(userWithHashedPass);
  }

  async getAllLibrarians(): Promise<Librarian[]> {
    return await this.repository.getAllLibrarians();
  }

  async getLibrarianByRegistration(userRegistration: string): Promise<Librarian> {
    const Librarian = await this.repository.getLibrarianByRegistration(userRegistration);
    if (!Librarian) throw new Error(`Librarian with registration ${userRegistration} not found.`);
    return Librarian;
  }

  async updateLibrarian(userRegistration: string, updatedData: Partial<Omit<Librarian, "userId">>): Promise<Librarian> {
    const existing = await this.repository.getLibrarianByRegistration(userRegistration);
    if (!existing) throw new Error(`Librarian with registration ${userRegistration} not found.`);
    if (updatedData.userPassword) {
      updatedData.userPassword = await bcrypt.hash(updatedData.userPassword, 10);
    }
    if (updatedData.userRegistration && updatedData.userRegistration !== userRegistration) {
      const registrationInUse = await this.repository.getLibrarianByRegistration(updatedData.userRegistration);
      if (registrationInUse) throw new DuplicateRegistrationException(`Registration ${updatedData.userRegistration} already in use.`);
    }
    this.validateUserData({ ...existing.toJSON(), ...updatedData });
    return await this.repository.updateLibrarian(userRegistration, updatedData);
  }

  async deleteLibrarian(userRegistration: string): Promise<Librarian | string> {
    const existing = await this.repository.getLibrarianByRegistration(userRegistration);
    if (!existing) throw new Error(`Librarian with registration ${userRegistration} not found.`);
    return await this.repository.deleteLibrarian(userRegistration);
  }

  async authenticate(userRegistration: string, userPassword: string) {
    const user = await this.repository.getLibrarianByRegistration(userRegistration);
    if (!user) throw new Error(`Librarian with registration ${userRegistration} not found.`);
    const passwordOk = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordOk) throw new Error("Invalid user or password.");
    const payload = { id: user.userId, registration: user.userRegistration };
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    return { user, token };
  }
}
