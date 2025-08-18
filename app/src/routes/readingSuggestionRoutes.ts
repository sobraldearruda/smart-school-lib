import { Router } from "express";
import { ReadingSuggestionController } from "../controllers/readingSuggestionController";
import { ReadingSuggestionService } from "../services/implementations/readingSuggestionService";
import { authenticateJWT, authorizeTeacher } from "../middlewares/authMiddleware";

const router = Router();

const readingSuggestionService = new ReadingSuggestionService();
const readingSuggestionController = new ReadingSuggestionController(readingSuggestionService);

router.post("/reading-suggestions", authenticateJWT, authorizeTeacher, async (req, res, next) => {
    try {
        await readingSuggestionController.createSuggestion(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/reading-suggestions", async (req, res, next) => {
    try {
        await readingSuggestionController.getAllSuggestions(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/reading-suggestions/:suggestionId", async (req, res, next) => {
    try {
        await readingSuggestionController.getSuggestionById(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.put("/reading-suggestions/:suggestionId", authenticateJWT, authorizeTeacher, async (req, res, next) => {
    try {
        await readingSuggestionController.updateSuggestion(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/reading-suggestions/:suggestionId", authenticateJWT, authorizeTeacher, async (req, res, next) => {
    try {
        await readingSuggestionController.deleteSuggestion(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
