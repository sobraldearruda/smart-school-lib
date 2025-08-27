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

  private validateBookData(bookData: any) {
    if (!bookData.bookTitle || !bookData.bookIsbn || !bookData.bookPublicationYear || !bookData.bookAuthors?.length) {
      throw new Error("All fields and at least one author are required.");
    }
  }

  async createBook(bookTitle: string, bookIsbn: string, bookPublicationYear: string, bookAuthors: {authorName: string}[]): Promise<Book> {
    this.validateBookData({ bookTitle, bookIsbn, bookPublicationYear, bookAuthors });
    const existing = await this.repository.getBookByTitle(bookTitle);
    if (existing) throw new DuplicateRegistrationException(`Registration with title ${bookTitle} already in use.`);
    const authorNames = bookAuthors.map(author => author.authorName.trim());
    const authors = await Author.findAll({ where: { authorName: authorNames } });
    if (authors.length !== authorNames.length) throw new Error("One or more authors not found.");
    const book = await this.repository.createBook(
      bookTitle.trim(),
      bookIsbn.trim(),
      bookPublicationYear.trim(),
      authors
    );    
    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.repository.getAllBooks();
    if (!books) throw new Error("No books found.");
    return books;
  }

  async getBookByTitle(bookTitle: string): Promise<Book> {
    if (!bookTitle) throw new Error("Book title required.");
    const book = await this.repository.getBookByTitle(bookTitle);
    if (!book) throw new Error("Book not found.");
    return book;
  }

  async updateBook(bookTitle: string, updatedData: Partial<Omit<Book, "bookId">>): Promise<Book> {
    if (!bookTitle) throw new Error("Book title required.");
    const existing = await this.repository.getBookByTitle(bookTitle);
    if (!existing) throw new Error("Book not found.");
    if (updatedData.bookAuthors) {
      const authorNames = updatedData.bookAuthors.map(author => author.authorName.trim());
      const authors = await Author.findAll({ where: { authorName: authorNames } });
      if (authors.length !== authorNames.length) throw new Error("One or more authors not found.");
    }
    this.validateBookData({ ...existing.toJSON(), ...updatedData });
    if (updatedData.bookTitle && updatedData.bookTitle !== bookTitle) {
      const duplicate = await this.repository.getBookByTitle(updatedData.bookTitle);
      if (duplicate) throw new DuplicateRegistrationException(`Registration with title ${updatedData.bookTitle} already in use.`);
    }
    return await this.repository.updateBook(bookTitle, updatedData);
  }

  async deleteBook(bookTitle: string): Promise<Book> {
    if (!bookTitle) throw new Error("Book title required.");
    const existing = await this.repository.getBookByTitle(bookTitle);
    if (!existing) throw new Error("Book not found.");
    return await this.repository.deleteBook(bookTitle);
  }
}
