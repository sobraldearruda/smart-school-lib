import { Author } from "../../models/author";

export async function AuthorSeeder() {
  console.log("Seeding Authors...");
  await Author.destroy({ where: {} });
  await Author.bulkCreate([
    { authorName: "J.K. Rowling" },
    { authorName: "J.R.R. Tolkien" },
    { authorName: "George R.R. Martin" },
  ]);
  console.log("Authors seeded.");
}
