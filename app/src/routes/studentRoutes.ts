import { Router } from "express";
import { StudentController } from "../controllers/studentController";

const router = Router();
const controller = new StudentController();

router.post("/students", controller.createStudent);
router.get("/students", controller.getAllStudents);
router.get("/students/:userRegistration", controller.getStudentByRegistration);
router.put("/students/:userRegistration", controller.updateStudent);
router.delete("/students/:userRegistration", controller.deleteStudent);

export default router;
