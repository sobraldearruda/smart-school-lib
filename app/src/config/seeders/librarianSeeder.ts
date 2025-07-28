import { Librarian } from "../../models/librarian";

export async function LibrarianSeeder() {
  console.log("Seeding Librarians...");
  await Librarian.destroy({ where: {} });
  await Librarian.bulkCreate([
    { userName: "Ana Maria", userEmail: "ana.maria@email.com", userRegistration: "12345" },
    { userName: "José Carlos", userEmail: "jose.carlos@email.com", userRegistration: "67890" },
  ]);
  console.log("Librarians seeded.");
}
