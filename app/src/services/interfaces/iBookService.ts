import { Book } from "../../models/book";

export interface IBookService {
  createBook(bookTitle: string, bookIsbn: string, bookPublicationYear: string, bookAuthors: {authorName: string}[]): Promise<Book>;
  getAllBooks(): Promise<Book[]>;
  getBookByTitle(bookTitle: string): Promise<Book>;
  updateBook(bookTitle: string, updatedData: Partial<Omit<Book, "bookId">>): Promise<Book>;
  deleteBook(bookTitle: string): Promise<Book>;
}
