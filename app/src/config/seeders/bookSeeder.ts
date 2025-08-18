import jwt from "jsonwebtoken";
import { Book } from "../../models/book";
import { Librarian } from "../../models/librarian";

function generateToken(user: any) {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ ...user }, secret, { expiresIn: "1h" });
}

export async function BookSeeder() {
  await Book.destroy({ where: {} });
  const librarian = await Librarian.findOne({ where: { userRegistration: "LIB12345" } });
  if (!librarian) {
    console.error("Not found.");
    return;
  }
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
  console.log(`JWT Librarian (${librarian.userName}):`, generateToken(librarian.toJSON()));
  console.log("Books seeded.");
}
