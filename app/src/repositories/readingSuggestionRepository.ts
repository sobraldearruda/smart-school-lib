import { BookLoan } from "../models/bookLoan";
import { ReadingSuggestion } from "../models/readingSuggestion";
import { Book } from "../models/book";
import { Teacher } from "../models/teacher";

export class ReadingSuggestionRepository {
  async createSuggestion(
    studentId: number,
    bookIds: number[]
  ): Promise<ReadingSuggestion> {
    const suggestion = await ReadingSuggestion.create({ studentId });
    const books = await Book.findAll({ where: { bookId: bookIds } });
    await suggestion.set("Books", books);
    return suggestion;
  }

  async getAllSuggestions(): Promise<ReadingSuggestion[]> {
    try {
      return await ReadingSuggestion.findAll({
        include: [
          {
            model: Teacher,
            as: "Teacher",
            attributes: ["userName"],
          },
          {
            model: Book,
            as: "Books",
            attributes: ["bookTitle"],
            through: { attributes: [] },
          },
        ],
      });
    } catch (err) {
      console.error("Erro em getAllSuggestions:", err);
      throw err; // deixa subir pro controller
    }
  }

  async getSuggestionById(
    suggestionId: number
  ): Promise<ReadingSuggestion | null> {
    return await ReadingSuggestion.findByPk(suggestionId, { include: [Book] });
  }

  async updateSuggestion(
    suggestionId: number,
    bookIds: number[]
  ): Promise<ReadingSuggestion | null> {
    const suggestion = await ReadingSuggestion.findByPk(suggestionId);
    if (!suggestion) return null;
    const books = await Book.findAll({ where: { bookId: bookIds } });
    await suggestion.set("Books", books);
    return suggestion;
  }

  async deleteSuggestion(suggestionId: number): Promise<string> {
    return (
      await ReadingSuggestion.destroy({ where: { suggestionId } })
    ).toString();
  }
}
