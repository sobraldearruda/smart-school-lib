import { Author } from "../../models/author";
import { Book } from "../../models/book";

export async function BookAuthorSeeder() {
  const [
    assis,
    lispector,
    evaristo,
    rosa,
    alencar,
    amado,
    ramos,
    azevedo
  ] = await Promise.all([
    Author.findOne({ where: { authorName: "Machado de Assis" } }),
    Author.findOne({ where: { authorName: "Clarice Lispector" } }),
    Author.findOne({ where: { authorName: "Conceição Evaristo" } }),
    Author.findOne({ where: { authorName: "João Guimarães Rosa" } }),
    Author.findOne({ where: { authorName: "José de Alencar" } }),
    Author.findOne({ where: { authorName: "Jorge Amado" } }),
    Author.findOne({ where: { authorName: "Graciliano Ramos" } }),
    Author.findOne({ where: { authorName: "Aluísio Azevedo" } }),
  ]);

  const [
    memorias,
    casos,
    olhos,
    domCasmurro,
    grandeSertao,
    oGuarani,
    capitaes,
    vidasSecas,
    iracema,
    oCortico
  ] = await Promise.all([
    Book.findOne({ where: { bookTitle: "Memórias Póstumas de Brás Cubas" } }),
    Book.findOne({ where: { bookTitle: "Casos de Família" } }),
    Book.findOne({ where: { bookTitle: "Olhos D'água" } }),
    Book.findOne({ where: { bookTitle: "Dom Casmurro" } }),
    Book.findOne({ where: { bookTitle: "Grande Sertão: Veredas" } }),
    Book.findOne({ where: { bookTitle: "O Guarani" } }),
    Book.findOne({ where: { bookTitle: "Capitães da Areia" } }),
    Book.findOne({ where: { bookTitle: "Vidas Secas" } }),
    Book.findOne({ where: { bookTitle: "Iracema" } }),
    Book.findOne({ where: { bookTitle: "O Cortiço" } }),
  ]);

  // Relaciona autores e livros
  if (assis) {
    if (memorias) await memorias.addAuthor(assis);
    if (domCasmurro) await domCasmurro.addAuthor(assis);
  }
  if (lispector && casos) await casos.addAuthor(lispector);
  if (evaristo && olhos) await olhos.addAuthor(evaristo);
  if (rosa && grandeSertao) await grandeSertao.addAuthor(rosa);
  if (alencar) {
    if (oGuarani) await oGuarani.addAuthor(alencar);
    if (iracema) await iracema.addAuthor(alencar);
  }
  if (amado && capitaes) await capitaes.addAuthor(amado);
  if (ramos && vidasSecas) await vidasSecas.addAuthor(ramos);
  if (azevedo && oCortico) await oCortico.addAuthor(azevedo);

  console.log("Book-Author relationships seeded.");
}
