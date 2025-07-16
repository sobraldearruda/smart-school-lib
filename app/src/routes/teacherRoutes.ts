import { Router } from "express";
import { TeacherController } from "../controllers/teacherController";

const router = Router();
const controller = new TeacherController();

router.post("/teachers", controller.createTeacher);
router.get("/teachers", controller.getAllTeachers);
router.get("/teachers/:userRegistration", controller.getTeacherByRegistration);
router.put("/teachers/:userRegistration", controller.updateTeacher);
router.delete("/teachers/:userRegistration", controller.deleteTeacher);

export default router;
