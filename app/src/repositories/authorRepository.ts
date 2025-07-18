import { Author } from "../models/author";
import { AuthorNotFoundException } from "../exceptions/authorNotFoundException";

export class AuthorRepository {

  async createAuthor(authorName: string, authorBiography?: string) {
    return await Author.create({
      authorName,
      authorBiography
    });
  }
  
  async getAllAuthors() {
    return await Author.findAll();
  }
  
  async getAuthorByName(authorName: string) {
    const author = await Author.findOne({ where: { authorName } });
    if (!author) {
      throw new AuthorNotFoundException(`Author with name ${authorName} not found.`);
    }
    return author;
  }
  
  async updateAuthor(authorName: string, updatedData: Partial<Omit<Author, "authorId">>) {
    const author = await Author.findOne({ where: { authorName } });
    if (!author) {
      throw new AuthorNotFoundException(`Author with name ${authorName} not found.`);
    }
    return await author.update(updatedData);
  }

  async deleteAuthor(authorName: string) {
    const author = await Author.findOne({ where: { authorName } });
    if (!author) {
      throw new AuthorNotFoundException(`Author with name ${authorName} not found.`);
    }
    await author.destroy();
    return author;
  }
}
