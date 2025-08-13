import jwt from "jsonwebtoken";
import { Teacher } from "../../models/teacher";
import { Book } from "../../models/book";
import { ReadingSuggestion } from "../../models/readingSuggestion";

function generateToken(user: any) {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ ...user }, secret, { expiresIn: "1h" });
}

export async function ReadingSuggestionSeeder() {
  console.log("Seeding Reading Suggestions...");
  await ReadingSuggestion.destroy({ where: {} });
  const teacher = await Teacher.findOne({ where: { userRegistration: "TCH12345" } });
  const books = await Book.findAll({
    where: { 
      bookTitle: ["Grande Sertão: Veredas", "A Hora da Estrela"] 
    }
  });
  if (teacher && books.length) {
    const suggestion = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion.setBooks(books);
    console.log(`JWT Teacher (${teacher.userName}):`, generateToken(teacher.toJSON()));
  } else {
    console.warn("Teacher or book(s) not found.");
  }
  console.log("Reading Suggestions seeded.");
}
