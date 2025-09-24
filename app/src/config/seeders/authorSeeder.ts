import jwt from "jsonwebtoken";
import { Author } from "../../models/author";
import { Librarian } from "../../models/librarian";

function generateToken(user: any) {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ ...user }, secret, { expiresIn: "1h" });
}

export async function AuthorSeeder() {
  await Author.destroy({ where: {} });

  const librarian = await Librarian.findOne({ where: { userRegistration: "LIB12345" } });
  if (!librarian) {
    console.error("Not found.");
    return;
  }

  await Author.bulkCreate([
    {
      authorName: "Machado de Assis",
      authorBiography:
        "A Brazilian writer, poet, playwright, and literary critic, Machado de Assis is considered one of the greatest writers in Brazilian literature.",
    },
    {
      authorName: "Clarice Lispector",
      authorBiography:
        "A Brazilian novelist and short story writer acclaimed internationally for her innovative novels and short stories, Clarice Lispector is a key figure in Brazilian literature.",
    },
    {
      authorName: "Conceição Evaristo",
      authorBiography:
        "A Brazilian writer and activist, Conceição Evaristo's work often explores themes of race, class, gender, and identity in Brazil.",
    },
    {
      authorName: "João Guimarães Rosa",
      authorBiography:
        "A Brazilian novelist and diplomat, João Guimarães Rosa is best known for 'Grande Sertão: Veredas', a landmark of Brazilian modernist literature.",
    },
    {
      authorName: "José de Alencar",
      authorBiography:
        "One of the most prominent writers of Brazilian Romanticism, José de Alencar is known for works that explore national identity and indigenous culture.",
    },
    {
      authorName: "Jorge Amado",
      authorBiography:
        "A celebrated Brazilian writer, Jorge Amado wrote novels depicting the customs, struggles, and folklore of the Brazilian people, especially from Bahia.",
    },
    {
      authorName: "Graciliano Ramos",
      authorBiography:
        "One of the greatest Brazilian novelists of the 20th century, Graciliano Ramos is known for his stark portrayal of the harsh realities of life in Brazil’s Northeast.",
    },
    {
      authorName: "Aluísio Azevedo",
      authorBiography:
        "A Brazilian novelist and diplomat, Aluísio Azevedo is a key figure in Naturalism in Brazil and is best known for his novel 'O Cortiço'.",
    },
  ]);

  console.log(`JWT Librarian (${librarian.userName}):`, generateToken(librarian.toJSON()));
  console.log("Authors seeded.");
}
