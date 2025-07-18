import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import * as swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

import studentRoutes from "./routes/studentRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import librarianRoutes from "./routes/librarianRoutes";
import bookRoutes from "./routes/bookRoutes";
import authorRoutes from "./routes/authorRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);
app.use("/api", librarianRoutes);
app.use("/api", bookRoutes);
app.use("/api", authorRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});
