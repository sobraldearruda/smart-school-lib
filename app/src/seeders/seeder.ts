import { Author } from "../models/author";
import { Book } from "../models/book";

export async function Seeder() {
  const authorsCount = await Author.count();
  const booksCount = await Book.count();

  if (authorsCount === 0 && booksCount === 0) {
    console.log("Populando banco de dados com dados iniciais...");

    const author1 = await Author.create({ authorName: "J.K. Rowling" });
    const author2 = await Author.create({ authorName: "J.R.R. Tolkien" });

    const book1 = await Book.create({
      bookTitle: "Harry Potter and the Sorcerer's Stone",
      bookIsbn: "9780747532699",
      bookPublicationYear: "1997",
    });

    const book2 = await Book.create({
      bookTitle: "The Hobbit",
      bookIsbn: "9780618968633",
      bookPublicationYear: "1937",
    });

    const book3 = await Book.create({
      bookTitle: "Harry Potter and the Chamber of Secrets",
      bookIsbn: "9780747538493",
      bookPublicationYear: "1998",
    });

    await book1.addAuthor(author1);
    await book3.addAuthor(author1);
    await book2.addAuthor(author2);

    console.log("Dados iniciais inseridos com sucesso!");
  } else {
    console.log("Dados já existentes no banco. Seeder não executado.");
  }
}
