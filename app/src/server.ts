import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import * as swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { InitialSeeder } from "./config/seeders/initialSeeder";

import "./models/teacher";
import "./models/student";
import "./models/librarian";
import "./models/book";
import "./models/author";
import { setupAssociations } from "./models/associations";

setupAssociations();

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

(async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synchronized successfully!");
  await InitialSeeder();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})().catch((error) => {
  console.error("Error while connecting to database:", error);
});
