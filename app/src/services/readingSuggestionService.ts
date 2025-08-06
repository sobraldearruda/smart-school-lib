import { ReadingSuggestionRepository } from '../repositories/readingSuggestionRepository';
import { ReadingSuggestion } from '../models/readingSuggestion';

export class ReadingSuggestionService {
  private repository = new ReadingSuggestionRepository();

  async createSuggestion(studentId: number, bookIds: number[]): Promise<ReadingSuggestion> {
    if (!studentId || !bookIds || bookIds.length === 0) {
      throw new Error("Student ID and at least one Book ID are required.");
    }
    return await this.repository.createSuggestion(studentId, bookIds);
  }

  async getAllSuggestions(): Promise<ReadingSuggestion[]> {
    return await this.repository.getAllSuggestions();
  }

  async getSuggestionById(suggestionId: number): Promise<ReadingSuggestion> {
    const suggestion = await this.repository.getSuggestionById(suggestionId);
    if (!suggestion) throw new Error(`Suggestion with ID ${suggestionId} not found.`);
    return suggestion;
  }

  async updateSuggestion(suggestionId: number, bookIds: number[]): Promise<ReadingSuggestion> {
    const updated = await this.repository.updateSuggestion(suggestionId, bookIds);
    if (!updated) throw new Error(`Suggestion with ID ${suggestionId} not found.`);
    return updated;
  }

  async deleteSuggestion(suggestionId: number): Promise<void> {
    const success = await this.repository.deleteSuggestion(suggestionId);
    if (!success) throw new Error(`Suggestion with ID ${suggestionId} not found.`);
  }
}
