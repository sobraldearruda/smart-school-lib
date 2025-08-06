import { Author } from "../../models/author";
import { Book } from "../../models/book";

export async function BookAuthorSeeder() {
  console.log("Seeding Book-Author Relationships...");
  const [assis, lispector, evaristo] = await Promise.all([
    Author.findOne({ where: { authorName: "Machado de Assis" } }),
    Author.findOne({ where: { authorName: "Clarice Lispector" } }),
    Author.findOne({ where: { authorName: "Conceição Evaristo" } }),
  ]);
  const [memorias, casos, olhos] = await Promise.all([
    Book.findOne({ where: { bookTitle: "Memórias Póstumas de Brás Cubas" } }),
    Book.findOne({ where: { bookTitle: "Casos de Família" } }),
    Book.findOne({ where: { bookTitle: "Olhos D'água" } }),
  ]);
  if (assis && memorias) await memorias.addAuthor(assis);
  if (lispector && casos) await casos.addAuthor(lispector);
  if (evaristo && olhos) await olhos.addAuthor(evaristo);
  console.log("Book-Author relationships seeded.");
}
