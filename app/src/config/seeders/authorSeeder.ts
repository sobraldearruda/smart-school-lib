import { Author } from "../../models/author";

export async function AuthorSeeder() {
  console.log("Seeding Authors...");
  await Author.destroy({ where: {} });
  await Author.bulkCreate([
    { authorName: "Machado de Assis" },
    { authorName: "Clarice Lispector" },
    { authorName: "Conceição Evaristo" },
  ]);
  console.log("Authors seeded.");
}
