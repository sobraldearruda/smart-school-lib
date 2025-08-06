import { Author } from "../../models/author";

export interface IAuthorService {
  createAuthor(authorName: string, authorBiography?: string): Promise<Author>;
  getAllAuthors(): Promise<Author[]>;
  getAuthorByName(authorName: string): Promise<Author>;
  updateAuthor(authorName: string, updatedData: Partial<Omit<Author, "authorId">>): Promise<Author>;
  deleteAuthor(authorName: string): Promise<Author>;
}
