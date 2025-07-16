import * as express from "express";
import * as dotenv from "dotenv";
import  sequelize from "./config/database";
import { StudentRepository } from "./repositories/studentRepository";

dotenv.config();

const app = express();
app.use(express.json());

const studentRepo = new StudentRepository();

app.post("/users", async (req, res) => {
  try {
    const { name, email, registration } = req.body;
    const user = await studentRepo.createStudent(name, email, registration);
    res.json(user); // Retorna o usuário criado
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await studentRepo.getAllStudents();
    res.json(users); // Retorna todos os usuários
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
  }
});

// Testando a conexão e inicializando o servidor
sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});
