import { AuthorSeeder } from "./authorSeeder";
import { BookSeeder } from "./bookSeeder";
import { BookAuthorSeeder } from "./bookAuthorSeeder";
import { StudentSeeder } from "./studentSeeder";
import { TeacherSeeder } from "./teacherSeeder";
import { LibrarianSeeder } from "./librarianSeeder";
import { BookLoanSeeder } from "./bookLoanSeeder";

export async function InitialSeeder() {
  console.log("Seeding entire database...");
  await AuthorSeeder();
  await BookSeeder();
  await BookAuthorSeeder();
  await StudentSeeder();
  await TeacherSeeder();
  await LibrarianSeeder();
  await BookLoanSeeder();
  console.log("Seeding completed.");
}
