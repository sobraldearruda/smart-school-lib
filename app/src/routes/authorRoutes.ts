import { Router } from "express";
import { AuthorController } from "../controllers/authorController";
import { AuthorService } from "../services/implementations/authorService"; 
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const router = Router();
const authorService = new AuthorService();
const authorController = new AuthorController(authorService);

router.post("/authors", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await authorController.createAuthor(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/authors", async (req, res, next) => {
    try {
        await authorController.getAllAuthors(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/authors/:authorName", async (req, res, next) => {
    try {
        await authorController.getAuthorByName(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.put("/authors/:authorName", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await authorController.updateAuthor(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/authors/:authorName", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await authorController.deleteAuthor(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
