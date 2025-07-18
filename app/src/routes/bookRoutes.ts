import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();
const controller = new BookController();

router.post("/books", controller.createBook);
router.get("/books", controller.getAllBooks);
router.get("/books/:bookTitle", controller.getBookByTitle);
router.put("/books/:bookTitle", controller.updateBook);
router.delete("/books/:bookTitle", controller.deleteBook);

export default router;
