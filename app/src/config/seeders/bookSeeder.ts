import { Book } from "../../models/book";

export async function BookSeeder() {
  console.log("Seeding Books...");
  await Book.destroy({ where: {} });
  await Book.bulkCreate([
    {
      bookTitle: "Harry Potter and the Sorcerer's Stone",
      bookIsbn: "9780747532699",
      bookPublicationYear: "1997",
    },
    {
      bookTitle: "The Hobbit",
      bookIsbn: "9780618968633",
      bookPublicationYear: "1937",
    },
    {
      bookTitle: "A Game of Thrones",
      bookIsbn: "9780553573404",
      bookPublicationYear: "1996",
    },
  ]);
  console.log("Books seeded.");
}
