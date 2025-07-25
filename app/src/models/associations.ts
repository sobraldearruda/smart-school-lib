import { Book } from "./book";
import { Author } from "./author";

export function setupAssociations() {
  Book.belongsToMany(Author, {
    through: "book_authors",
    foreignKey: "bookId",
    otherKey: "authorId",
  });

  Author.belongsToMany(Book, {
    through: "book_authors",
    foreignKey: "authorId",
    otherKey: "bookId",
  });
}
