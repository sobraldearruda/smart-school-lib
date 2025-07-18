import { BookRepository } from "../repositories/bookRepository";
import { Book } from "../models/book";
import { BookNotFoundException } from "../exceptions/bookNotFoundException";
import { DuplicateRegistrationException } from "../exceptions/duplicateRegistrationException";

export class BookService {
  private repository: BookRepository;

  constructor() {
    this.repository = new BookRepository();
  }

  async createBook(bookTitle: string, bookIsbn: string, bookPublicationYear: string): Promise<Book> {
    try {
      const existing = await this.repository.getBookByTitle(bookTitle);
      if (existing) {
        throw new DuplicateRegistrationException(`Registration with title ${bookTitle} already in use.`);
      }
    } catch (error) {
      if (!(error instanceof BookNotFoundException)) {
        throw error;
      }
    }
    if (!bookTitle || !bookIsbn || !bookPublicationYear) {
      throw new Error("All fields required.");
    }
    return await this.repository.createBook(bookTitle.trim(), bookIsbn.trim(), bookPublicationYear.trim());
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.repository.getAllBooks();
  }

  async getBookByTitle(bookTitle: string): Promise<Book> {
    return await this.repository.getBookByTitle(bookTitle);
  }

  async updateBook(bookTitle: string, updatedData: Partial<Omit<Book, "bookId">>): Promise<Book> {
    if (Object.keys(updatedData).length === 0) {
      throw new Error("No content informed.");
    }
    return await this.repository.updateBook(bookTitle, updatedData);
  }

  async deleteBook(bookTitle: string): Promise<Book> {
    return await this.repository.deleteBook(bookTitle);
  }
}
