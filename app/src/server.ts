import * as express from "express";
import * as dotenv from "dotenv";
import  sequelize from "./config/database";
import studentRoutes from "./routes/studentRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import librarianRoutes from "./routes/librarianRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);
app.use("/api", librarianRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});
