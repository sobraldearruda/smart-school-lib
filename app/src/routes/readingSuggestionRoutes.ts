import { Router } from "express";
import { ReadingSuggestionController } from "../controllers/readingSuggestionController";
import { ReadingSuggestionService } from "../services/implementations/readingSuggestionService";
import { authenticateJWT, authorizeTeacher } from "../middlewares/authMiddleware";

const router = Router();

const readingSuggestionService = new ReadingSuggestionService();
const readingSuggestionController = new ReadingSuggestionController(readingSuggestionService);

router.post("/reading-suggestions", authenticateJWT, authorizeTeacher, readingSuggestionController.createSuggestion);
router.get("/reading-suggestions", readingSuggestionController.getAllSuggestions);
router.get("/reading-suggestions/:suggestionId", readingSuggestionController.getSuggestionById);
router.put("/reading-suggestions/:suggestionId", authenticateJWT, authorizeTeacher, readingSuggestionController.updateSuggestion);
router.delete("/reading-suggestions/:suggestionId", authenticateJWT, authorizeTeacher, readingSuggestionController.deleteSuggestion);

export default router;
