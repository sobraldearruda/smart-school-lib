import { Router } from "express";
import { AuthorController } from "../controllers/authorController";

const router = Router();
const controller = new AuthorController();

router.post("/authors", controller.createAuthor);
router.get("/authors", controller.getAllAuthors);
router.get("/authors/:authorName", controller.getAuthorByName);
router.put("/authors/:authorName", controller.updateAuthor);
router.delete("/authors/:authorName", controller.deleteAuthor);

export default router;
