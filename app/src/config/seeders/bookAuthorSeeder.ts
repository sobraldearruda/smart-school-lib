import { Author } from "../../models/author";
import { Book } from "../../models/book";

export async function BookAuthorSeeder() {
  console.log("Seeding Book-Author Relationships...");
  const [assis, lispector, evaristo] = await Promise.all([
    Author.findOne({ where: { authorName: "Machado de Assis" } }),
    Author.findOne({ where: { authorName: "Clarice Lispector" } }),
    Author.findOne({ where: { authorName: "Conceição Evaristo" } }),
  ]);
  const [hp1, hobbit, got] = await Promise.all([
    Book.findOne({ where: { bookTitle: "Memórias Póstumas de Brás Cubas" } }),
    Book.findOne({ where: { bookTitle: "Casos de Família" } }),
    Book.findOne({ where: { bookTitle: "Olhos D'água" } }),
  ]);
  if (assis && hp1) await hp1.addAuthor(assis);
  if (lispector && hobbit) await hobbit.addAuthor(lispector);
  if (evaristo && got) await got.addAuthor(evaristo);
  console.log("Book-Author relationships seeded.");
}
