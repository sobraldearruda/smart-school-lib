import { Router } from "express";
import { LibrarianController } from "../controllers/librarianController";
import { LibrarianService } from "../services/implementations/librarianService";
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const librarianService = new LibrarianService();
const librarianController = new LibrarianController(librarianService);

const router = Router();

router.post("/librarians", async (req, res, next) => {
    try {
        await librarianController.createLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/librarians", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await librarianController.getAllLibrarians(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/librarians/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await librarianController.getLibrarianByRegistration(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.put("/librarians/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await librarianController.updateLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/librarians/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await librarianController.deleteLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.post("/librarians/login", async (req, res, next) => {
    try {
        await librarianController.loginLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
