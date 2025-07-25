import { Librarian } from "../../models/librarian";

export async function LibrarianSeeder() {
  console.log("Seeding Librarians...");
  await Librarian.destroy({ where: {} });
  await Librarian.bulkCreate([
    { userName: "Librarian Joy", userEmail: "joy@library.com", userRegistration: "L12345" },
    { userName: "Librarian Jenny", userEmail: "jenny@library.com", userRegistration: "L67890" },
  ]);
  console.log("Librarians seeded.");
}
