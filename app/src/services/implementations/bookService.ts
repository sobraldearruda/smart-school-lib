import { BookRepository } from "../../repositories/bookRepository";
import { Book } from "../../models/book";
import { Author } from "../../models/author";
import { DuplicateRegistrationException } from "../../exceptions/duplicateRegistrationException";
import { IBookService } from "../interfaces/iBookService";

export class BookService implements IBookService {
  private repository: BookRepository;

  constructor() {
    this.repository = new BookRepository();
  }

  async createBook(bookTitle: string, bookIsbn: string, bookPublicationYear: string, bookAuthors: {authorName: string}[]): Promise<Book> {
    try {
      const existing = await this.repository.getBookByTitle(bookTitle);
      if (existing) {
        throw new DuplicateRegistrationException(`Registration with title ${bookTitle} already in use.`);
      }
    } catch (error) {
      throw new Error(`It is not possible to create book.`);
    }

    if (!bookTitle || !bookIsbn || !bookPublicationYear || !bookAuthors?.length) {
      throw new Error("All fields and at least one author are required.");
    }

    const authorNames = bookAuthors.map(author => author.authorName.trim());
    const authors = await Author.findAll({
      where: { authorName: authorNames }
    });

    if (authors.length !== authorNames.length) {
      throw new Error("One or more authors not found.");
    }

    const book = await this.repository.createBook(
      bookTitle.trim(),
      bookIsbn.trim(),
      bookPublicationYear.trim(),
      authors
    );
    
    return book;
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
