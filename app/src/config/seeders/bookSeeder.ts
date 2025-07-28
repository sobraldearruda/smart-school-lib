import { Book } from "../../models/book";

export async function BookSeeder() {
  console.log("Seeding Books...");
  await Book.destroy({ where: {} });
  await Book.bulkCreate([
    {
      bookTitle: "Memórias Póstumas de Brás Cubas",
      bookIsbn: "9780747532699",
      bookPublicationYear: "1881",
    },
    {
      bookTitle: "Casos de Família",
      bookIsbn: "9780618968633",
      bookPublicationYear: "1960",
    },
    {
      bookTitle: "Olhos D'água",
      bookIsbn: "9780553573404",
      bookPublicationYear: "2014",
    },
  ]);
  console.log("Books seeded.");
}
