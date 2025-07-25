import { Student } from "../../models/student";

export async function StudentSeeder() {
  console.log("Seeding Students...");
  await Student.destroy({ where: {} });
  await Student.bulkCreate([
    { userName: "Alice", userEmail: "alice@student.com", userRegistration: "S12345" },
    { userName: "Bob", userEmail: "bob@student.com", userRegistration: "S67890" },
  ]);
  console.log("Students seeded.");
}
