import { Router } from "express";
import { LibrarianController } from "../controllers/librarianController";

const router = Router();
const controller = new LibrarianController();

router.post("/librarans", controller.createLibrarian);
router.get("/librarians", controller.getAllLibrarians);
router.get("/librarians/:userRegistration", controller.getLibrarianByRegistration);
router.put("/librarians/:userRegistration", controller.updateLibrarian);
router.delete("/librarians/:userRegistration", controller.deleteLibrarian);

export default router;
