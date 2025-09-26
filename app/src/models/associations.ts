import { Book } from "./book";
import { Author } from "./author";
import { BookLoan } from "./bookLoan";
import { Student } from "./student";
import { ReadingSuggestion } from "./readingSuggestion";
import { Teacher } from "./teacher";

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
  BookLoan.belongsTo(Student, { 
    foreignKey: 'studentId' 
  });
  BookLoan.belongsTo(Book, { 
    foreignKey: 'bookId' 
  });
  Student.hasMany(BookLoan, { 
    foreignKey: 'studentId' 
  });
  Book.hasMany(BookLoan, { 
    foreignKey: 'bookId' 
  });
  ReadingSuggestion.belongsTo(Teacher, {
    foreignKey: "teacherId",
    as: "Teacher",
  });
  ReadingSuggestion.belongsToMany(Book, {
    through: 'reading_suggestions_books',
    foreignKey: 'suggestionId',
    otherKey: 'bookId',
  });
  Book.belongsToMany(ReadingSuggestion, {
    through: 'reading_suggestions_books',
    foreignKey: 'bookId',
    otherKey: 'suggestionId',
  });
}
