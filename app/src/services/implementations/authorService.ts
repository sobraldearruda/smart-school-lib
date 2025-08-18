import { AuthorRepository } from "../../repositories/authorRepository";
import { Author } from "../../models/author";
import { DuplicateRegistrationException } from "../../exceptions/duplicateRegistrationException";
import { IAuthorService } from "../interfaces/iAuthorService";

export class AuthorService implements IAuthorService {
  private repository: AuthorRepository;

  constructor() {
    this.repository = new AuthorRepository();
  }

  async createAuthor(authorName: string, authorBiography?: string): Promise<Author> {
    try {
      const existing = await this.repository.getAuthorByName(authorName);
      if (existing) {
        throw new DuplicateRegistrationException(`Registration with ${authorName} already in use.`);
      }
    } catch (error) {
      throw new Error(`It is not possible to create author.`);
    }
    if (!authorName) {
      throw new Error("Author name required.");
    }
    return await this.repository.createAuthor(authorName.trim(), authorBiography?.trim());
  }

  async getAllAuthors(): Promise<Author[]> {
    return await this.repository.getAllAuthors();
  }

  async getAuthorByName(authorName: string): Promise<Author> {
    return await this.repository.getAuthorByName(authorName);
  }

  async updateAuthor(authorName: string, updatedData: Partial<Omit<Author, "authorId">>): Promise<Author> {
    if (Object.keys(updatedData).length === 0) {
      throw new Error("No content informed.");
    }
    return await this.repository.updateAuthor(authorName, updatedData);
  }

  async deleteAuthor(authorName: string): Promise<Author> {
    return await this.repository.deleteAuthor(authorName);
  }
}
