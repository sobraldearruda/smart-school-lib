import { Student } from "../../models/student";

export async function StudentSeeder() {
  console.log("Seeding Students...");
  await Student.destroy({ where: {} });
  await Student.bulkCreate([
    { userName: "Alice Silva", 
      userEmail: "alice.silva@email.com", 
      userRegistration: "12345",
      userPassword: "54321"
    },
    { userName: "Carlos Daniel", 
      userEmail: "carlos.daniel@email.com", 
      userRegistration: "67890", 
      userPassword: "09876"
    },
  ]);
  console.log("Students seeded.");
}
