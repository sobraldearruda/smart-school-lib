import { Student } from "../../models/student";
import { Book } from "../../models/book";
import { ReadingSuggestion } from "../../models/readingSuggestion";

export async function ReadingSuggestionSeeder() {
  console.log("Seeding Reading Suggestions...");
  const [student1] = await Promise.all([
    Student.findOne({ where: { userRegistration: "12345" } }),
  ]);
  const books = await Book.findAll({ where: { 
    bookTitle: ["Grande Sertão: Veredas", "A Hora da Estrela"] 
  } });
  if (student1 && books.length) {
    const suggestion = await ReadingSuggestion.create({ studentId: student1.userId });
    await suggestion.setBooks(books);
  }
  console.log("Reading Suggestions seeded.");
}
