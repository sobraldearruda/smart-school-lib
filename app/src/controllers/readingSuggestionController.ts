import { Request, Response } from "express";
import { IReadingSuggestionService } from "../services/interfaces/iReadingSuggestionService";

export class ReadingSuggestionController {

  private service: IReadingSuggestionService;

  constructor(service: IReadingSuggestionService) {
    this.service = service;
  }

  createSuggestion = async (req: Request, res: Response) => {
    try {
      const { studentId, bookIds } = req.body;
      const suggestion = await this.service.createSuggestion(studentId, bookIds);
      res.status(201).json(suggestion);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to create suggestion.", error: (error as Error).message });
    }
  };

  getAllSuggestions = async (_req: Request, res: Response) => {
    try {
      const suggestions = await this.service.getAllSuggestions();
      res.status(200).json(suggestions);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query suggestions.", error: (error as Error).message });
    }
  };

  getSuggestionById = async (req: Request, res: Response) => {
    try {
      const suggestion = await this.service.getSuggestionById(Number(req.params.suggestionId));
      res.status(200).json(suggestion);
    } catch (error) {
      res.status(404).json({ message: "It is not possible to query suggestion.", erro: (error as Error).message });
    }
  };

  updateSuggestion = async (req: Request, res: Response) => {
    try {
      const { bookIds } = req.body;
      const suggestion = await this.service.updateSuggestion(Number(req.params.suggestionId), bookIds);
      res.status(200).json(suggestion);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to update suggestion.", error: (error as Error).message });
    }
  };

  deleteSuggestion = async (req: Request, res: Response) => {
    try {
      await this.service.deleteSuggestion(Number(req.params.suggestionId));
      res.status(204).json({ message: "Suggestion deleted successfully." });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  };
}
