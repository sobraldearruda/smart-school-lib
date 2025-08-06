import { ReadingSuggestion } from "../../models/readingSuggestion";

export interface IReadingSuggestionService {
  createSuggestion(studentId: number, bookIds: number[]): Promise<ReadingSuggestion>;
  getAllSuggestions(): Promise<ReadingSuggestion[]>;
  getSuggestionById(suggestionId: number): Promise<ReadingSuggestion>;
  updateSuggestion(suggestionId: number, bookIds: number[]): Promise<ReadingSuggestion>;
  deleteSuggestion(suggestionId: number): Promise<void>;
}
