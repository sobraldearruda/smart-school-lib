import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Student } from "../../models/student";

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

function generateToken(user: any) {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ ...user }, secret, { expiresIn: "1h" });
}

export async function StudentSeeder() {
  await Student.destroy({ where: {} });
  const students = await Student.bulkCreate([
    { 
      userName: "Alice Silva", 
      userEmail: "alice.silva@email.com", 
      userRegistration: "TCH12345",
      userPassword: await hashPassword("54321")
    },
    { 
      userName: "David Lima", 
      userEmail: "david.lima@email.com", 
      userRegistration: "TCH67890",
      userPassword: await hashPassword("09876")
    },
  ], { returning: true });
  students.forEach(t => {
    console.log(`JWT Student (${t.userName}):`, generateToken(t.toJSON()));
  });
  console.log("Students seeded.");
}
