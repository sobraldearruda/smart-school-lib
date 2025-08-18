import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Librarian } from "../../models/librarian";

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

function generateToken(user: any) {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ ...user }, secret, { expiresIn: "1h" });
}

export async function LibrarianSeeder() {
  await Librarian.destroy({ where: {} });
  const librarians = await Librarian.bulkCreate([
    { 
      userName: "Ana Maria", 
      userEmail: "ana.maria@email.com", 
      userRegistration: "LIB12345",
      userPassword: await hashPassword("54321")
    },
    { 
      userName: "José Carlos", 
      userEmail: "jose.carlos@email.com", 
      userRegistration: "LIB67890",
      userPassword: await hashPassword("09876")
    },
  ], { returning: true });
  librarians.forEach(l => {
    console.log(`JWT Librarian (${l.userName}):`, generateToken(l.toJSON()));
  });
  console.log("Librarians seeded.");
}
