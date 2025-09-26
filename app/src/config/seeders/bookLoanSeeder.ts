import { Student } from "../../models/student";
import { Book } from "../../models/book";
import { BookLoan } from "../../models/bookLoan";

export async function BookLoanSeeder() {
  await BookLoan.destroy({ where: {} });
  const [student1, student2] = await Promise.all([
    Student.findOne({ where: { userRegistration: "STD12345" } }),
    Student.findOne({ where: { userRegistration: "STD67890" } }),
  ]);
  const books = await Book.findAll({ limit: 10 });
  if (!student1 || !student2 || books.length < 10) {
    console.error("It is not possible to seed due to missing students or books.");
    return;
  }
  await BookLoan.create({
    studentId: student1.userId,
    bookId: books[0].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student2.userId,
    bookId: books[1].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student1.userId,
    bookId: books[2].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student2.userId,
    bookId: books[3].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student1.userId,
    bookId: books[4].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student2.userId,
    bookId: books[5].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student1.userId,
    bookId: books[6].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student2.userId,
    bookId: books[7].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student1.userId,
    bookId: books[8].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  });
  await BookLoan.create({
    studentId: student2.userId,
    bookId: books[9].bookId,
    loanDate: new Date(),
    returnDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
  });

  console.log("Book Loans seeded.");
}
