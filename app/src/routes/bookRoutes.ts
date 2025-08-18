import { Router } from "express";
import { BookController } from "../controllers/bookController";
import { BookService } from "../services/implementations/bookService";
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const router = Router();

const bookService = new BookService();
const bookController = new BookController(bookService);

router.post("/books", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await bookController.createBook(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/books", async (req, res, next) => {
    try {
        await bookController.getAllBooks(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/books/:bookTitle", async (req, res, next) => {
    try {
        await bookController.getBookByTitle(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.put("/books/:bookTitle", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await bookController.updateBook(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/books/:bookTitle", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await bookController.deleteBook(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
