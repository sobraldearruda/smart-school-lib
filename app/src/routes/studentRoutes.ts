import { Router } from "express";
import { StudentController } from "../controllers/studentController";
import { StudentService } from "../services/implementations/studentService";
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const studentService = new StudentService();
const studentController = new StudentController(studentService);

const router = Router();

router.post("/students", async (req, res, next) => {
    try {
        await studentController.createStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/students", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await studentController.getAllStudents(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/students/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await studentController.getStudentByRegistration(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.put("/students/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await studentController.updateStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/students/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await studentController.deleteStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.post("/students/login", async (req, res, next) => {
    try {
        await studentController.loginStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
