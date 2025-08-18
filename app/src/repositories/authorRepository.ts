import { Author } from "../models/author";

export class AuthorRepository {

  async createAuthor(authorName: string, authorBiography?: string) {
    const author =  await Author.create({
      authorName,
      authorBiography
    });
    return author;
  }
  
  async getAllAuthors() {
    return await Author.findAll();
  }
  
  async getAuthorByName(authorName: string) {
    const author = await Author.findOne({ where: { authorName } });
    if (!author) {
      throw new Error(`Author with name ${authorName} not found.`);
    }
    return author;
  }
  
  async updateAuthor(authorName: string, updatedData: Partial<Omit<Author, "authorId">>) {
    const author = await Author.findOne({ where: { authorName } });
    if (!author) {
      throw new Error(`Author with name ${authorName} not found.`);
    }
    return await author.update(updatedData);
  }

  async deleteAuthor(authorName: string) {
    const author = await Author.findOne({ where: { authorName } });
    if (!author) {
      throw new Error(`Author with name ${authorName} not found.`);
    }
    await author.destroy();
    return author;
  }
}
