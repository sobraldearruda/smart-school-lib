import { AuthorRepository } from "../repositories/authorRepository";
import { Author } from "../models/author";
import { AuthorNotFoundException } from "../exceptions/authorNotFoundException";
import { DuplicateRegistrationException } from "../exceptions/duplicateRegistrationException";

export class AuthorService {
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
      if (!(error instanceof AuthorNotFoundException)) {
        throw error;
      }
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
