import { Router } from "express";
import { ReadingSuggestionController } from "../controllers/readingSuggestionController";

const router = Router();
const readingSuggestionController = new ReadingSuggestionController();

router.post("/reading-suggestions", readingSuggestionController.createSuggestion);
router.get("/reading-suggestions", readingSuggestionController.getAllSuggestions);
router.get("/reading-suggestions/:suggestionId", readingSuggestionController.getSuggestionById);
router.put("/reading-suggestions/:suggestionId", readingSuggestionController.updateSuggestion);
router.delete("/reading-suggestions/:suggestionId", readingSuggestionController.deleteSuggestion);

export default router;
