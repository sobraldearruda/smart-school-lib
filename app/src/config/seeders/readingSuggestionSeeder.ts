import jwt from "jsonwebtoken";
import { Teacher } from "../../models/teacher";
import { Book } from "../../models/book";
import { ReadingSuggestion } from "../../models/readingSuggestion";

function generateToken(user: any) {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ ...user }, secret, { expiresIn: "1h" });
}

export async function ReadingSuggestionSeeder() {
  await ReadingSuggestion.destroy({ where: {} });

  const teacher = await Teacher.findOne({ where: { userRegistration: "TCH12345" } });
  const books = await Book.findAll({ limit: 10 });

  if (teacher && books.length == 10) {
    const suggestion1 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion1.setBooks([books[0], books[1], books[2]]);

    const suggestion2 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion2.setBooks([books[1], books[3], books[4]]);

    const suggestion3 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion3.setBooks([books[2], books[5]]);

    const suggestion4 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion4.setBooks([books[3], books[6], books[7]]);

    const suggestion5 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion5.setBooks([books[4], books[8], books[9]]);

    const suggestion6 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion6.setBooks([books[5], books[0]]);

    const suggestion7 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion7.setBooks([books[6], books[1], books[2]]);

    const suggestion8 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion8.setBooks([books[7], books[3]]);

    const suggestion9 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion9.setBooks([books[8], books[4], books[5]]);

    const suggestion10 = await ReadingSuggestion.create({ teacherId: teacher.userId });
    await suggestion10.setBooks([books[9], books[0], books[6]]);

    console.log(`JWT Teacher (${teacher.userName}):`, generateToken(teacher.toJSON()));
  } else {
    console.warn("Teacher or not enough books found.");
  }
  console.log("Reading Suggestions seeded.");
}
