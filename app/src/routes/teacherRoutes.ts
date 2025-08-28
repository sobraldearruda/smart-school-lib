import { Router } from "express";
import { TeacherController } from "../controllers/teacherController";
import { TeacherService } from "../services/implementations/teacherService";
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const teacherService = new TeacherService();
const teacherController = new TeacherController(teacherService);

const router = Router();

router.post("/teachers", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.createTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/teachers", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.getAllTeachers(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/teachers/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.getTeacherByRegistration(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.put("/teachers/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.updateTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/teachers/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.deleteTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.post("/teachers/login", async (req, res, next) => {
    try {
        await teacherController.loginTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
