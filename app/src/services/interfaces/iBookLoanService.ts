import { BookLoan } from "../../models/bookLoan";

export interface IBookLoanService {
  createLoan(loanData: Partial<BookLoan>): Promise<BookLoan>;
  getAllLoans(): Promise<BookLoan[]>;
  getLoanById(loanId: number): Promise<BookLoan>;
  updateLoan(loanId: number, updatedData: Partial<BookLoan>): Promise<BookLoan>;
  deleteLoan(loanId: number): Promise<void>;
}
