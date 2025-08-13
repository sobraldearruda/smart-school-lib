import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Teacher } from "../../models/teacher";

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

function generateToken(user: any) {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ ...user }, secret, { expiresIn: "1h" });
}

export async function TeacherSeeder() {
  console.log("Seeding Teachers...");
  await Teacher.destroy({ where: {} });
  const teachers = await Teacher.bulkCreate([
    { 
      userName: "Rafael Sobral", 
      userEmail: "rafael.sobral@email.com", 
      userRegistration: "TCH12345",
      userPassword: await hashPassword("54321")
    },
    { 
      userName: "José Glauber", 
      userEmail: "jose.glauber@email.com", 
      userRegistration: "TCH67890",
      userPassword: await hashPassword("09876")
    },
  ], { returning: true });
  teachers.forEach(t => {
    console.log(`JWT Teacher (${t.userName}):`, generateToken(t.toJSON()));
  });
  console.log("Teachers seeded.");
}
