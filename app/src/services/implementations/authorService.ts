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
    if (!authorName) throw new Error("Author name required.");
    const existing = await this.repository.getAuthorByName(authorName);
    if (existing) throw new DuplicateRegistrationException(`Registration with ${authorName} already in use.`);
    return await this.repository.createAuthor(authorName.trim(), authorBiography?.trim());
  }

  async getAllAuthors(): Promise<Author[]> {
    const authors = await this.repository.getAllAuthors();
    if (!authors) throw new Error("No authors found.")
    return authors;
  }

  async getAuthorByName(authorName: string): Promise<Author> {
    if (!authorName) throw new Error("Author name required.");
    const author = await this.repository.getAuthorByName(authorName);
    if (!author) throw new Error("Author not found.");
    return author;
  }

  async updateAuthor(authorName: string, updatedData: Partial<Omit<Author, "authorId">>): Promise<Author> {
    if (!authorName) throw new Error("Author name required.");
    const existing = await this.repository.getAuthorByName(authorName);
    if (!existing) throw new Error("Author not found.");
    const author = await this.repository.updateAuthor(authorName, updatedData);
    if (!author.authorName) throw new Error("Author name required.");
    const duplicate = await this.repository.getAuthorByName(author.authorName);
    if (duplicate) throw new DuplicateRegistrationException(`Registration with ${author.authorName} already in use.`);
    return await this.repository.updateAuthor(authorName, updatedData);
  }

  async deleteAuthor(authorName: string): Promise<Author> {
    if (!authorName) throw new Error("Author name required.");
    const existing = this.repository.getAuthorByName(authorName);
    if (!existing) throw new Error("Author not found.");
    return await this.repository.deleteAuthor(authorName);
  }
}
