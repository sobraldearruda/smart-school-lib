import { Teacher } from "../../models/teacher";

export async function TeacherSeeder() {
  console.log("Seeding Teachers...");
  await Teacher.destroy({ where: {} });
  await Teacher.bulkCreate([
    { userName: "Professor Oak", userEmail: "oak@university.com", userRegistration: "T12345" },
    { userName: "Professor Birch", userEmail: "birch@university.com", userRegistration: "T67890" },
  ]);
  console.log("Teachers seeded.");
}
