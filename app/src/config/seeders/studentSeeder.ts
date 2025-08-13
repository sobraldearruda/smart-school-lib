import bcrypt from "bcryptjs";
import { Student } from "../../models/student";

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function StudentSeeder() {
  console.log("Seeding Students...");
  await Student.destroy({ where: {} });
  await Student.bulkCreate([
    { 
      userName: "Alice Silva", 
      userEmail: "alice.silva@email.com", 
      userRegistration: "STD12345",
      userPassword: await hashPassword("54321")
    },
    { 
      userName: "Carlos Daniel", 
      userEmail: "carlos.daniel@email.com", 
      userRegistration: "STD67890", 
      userPassword: await hashPassword("09876")
    },
  ]);
  console.log("Students seeded.");
}
