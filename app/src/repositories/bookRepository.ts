import { Book } from "../models/book";
import { BookNotFoundException } from "../exceptions/bookNotFoundException";

export class BookRepository {

  async createBook(bookTitle: string, bookIsbn: string, bookPublicationYear: string) {
    return await Book.create({
      bookTitle,
      bookIsbn,
      bookPublicationYear,
    });
  }
  
  async getAllBooks() {
    return await Book.findAll();
  }
  
  async getBookByTitle(bookTitle: string) {
    const book = await Book.findOne({ where: { bookTitle } });
    if (!book) {
      throw new BookNotFoundException(`Book with title ${bookTitle} not found.`);
    }
    return book;
  }
  
  async updateBook(bookTitle: string, updatedData: Partial<Omit<Book, "bookId">>) {
    const book = await Book.findOne({ where: { bookTitle } });
    if (!book) {
      throw new BookNotFoundException(`Book with title ${bookTitle} not found.`);
    }
    return await book.update(updatedData);
  }

  async deleteBook(bookTitle: string) {
    const book = await Book.findOne({ where: { bookTitle } });
    if (!book) {
      throw new BookNotFoundException(`Book with registration ${bookTitle} not found.`);
    }
    await book.destroy();
    return book;
  }
}
