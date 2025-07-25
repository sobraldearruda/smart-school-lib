import { Author } from "../../models/author";
import { Book } from "../../models/book";

export async function BookAuthorSeeder() {
  console.log("Seeding Book-Author Relationships...");
  const [rowling, tolkien, martin] = await Promise.all([
    Author.findOne({ where: { authorName: "J.K. Rowling" } }),
    Author.findOne({ where: { authorName: "J.R.R. Tolkien" } }),
    Author.findOne({ where: { authorName: "George R.R. Martin" } }),
  ]);
  const [hp1, hobbit, got] = await Promise.all([
    Book.findOne({ where: { bookTitle: "Harry Potter and the Sorcerer's Stone" } }),
    Book.findOne({ where: { bookTitle: "The Hobbit" } }),
    Book.findOne({ where: { bookTitle: "A Game of Thrones" } }),
  ]);
  if (rowling && hp1) await hp1.addAuthor(rowling);
  if (tolkien && hobbit) await hobbit.addAuthor(tolkien);
  if (martin && got) await got.addAuthor(martin);
  console.log("Book-Author relationships seeded.");
}
