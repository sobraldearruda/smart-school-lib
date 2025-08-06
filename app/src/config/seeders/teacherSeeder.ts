import { Teacher } from "../../models/teacher";

export async function TeacherSeeder() {
  console.log("Seeding Teachers...");
  await Teacher.destroy({ where: {} });
  await Teacher.bulkCreate([
    { 
      userName: "Rafael Sobral", 
      userEmail: "rafael.sobral@email.com", 
      userRegistration: "12345",
      userPassword: "54321"
    },
    { userName: "José Glauber", 
      userEmail: "jose.glauber@email.com", 
      userRegistration: "67890",
      userPassword: "09876"
    },
  ]);
  console.log("Teachers seeded.");
}
