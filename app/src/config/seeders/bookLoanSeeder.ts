import { Student } from "../../models/student";
import { Book } from "../../models/book";
import { BookLoan } from "../../models/bookLoan";

export async function BookLoanSeeder() {
  await BookLoan.destroy({ where: {} });
  const [student1, student2] = await Promise.all([
    Student.findOne({ where: { userRegistration: "12345" } }),
    Student.findOne({ where: { userRegistration: "67890" } }),
  ]);
  const [book1, book2] = await Promise.all([
    Book.findOne({ where: { bookTitle: "Memórias Póstumas de Brás Cubas" } }),
    Book.findOne({ where: { bookTitle: "Casos de Família" } }),
  ]);
  if (student1 && book1) {
    await BookLoan.create({
      studentId: student1.userId,
      bookId: book1.bookId,
      loanDate: new Date(),
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }
  if (student2 && book2) {
    await BookLoan.create({
      studentId: student2.userId,
      bookId: book2.bookId,
      loanDate: new Date(),
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });
  }
  console.log("Book Loans seeded.");
}
