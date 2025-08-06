import { BookLoanRepository } from '../repositories/bookLoanRepository';
import { BookLoan } from '../models/bookLoan';

export class BookLoanService {
    
  private repository = new BookLoanRepository();

  async createLoan(loanData: Partial<BookLoan>): Promise<BookLoan> {
    if (!loanData.userId || !loanData.bookId || !loanData.loanDate) {
      throw new Error("All fields required.");
    }
    return await this.repository.createLoan(loanData);
  }

  async getAllLoans(): Promise<BookLoan[]> {
    return await this.repository.getAllLoans();
  }

  async getLoanById(loanId: number): Promise<BookLoan> {
    const loan = await this.repository.getLoanById(loanId);
    if (!loan) throw new Error(`Loan with ID ${loanId} not found.`);
    return loan;
  }

  async updateLoan(loanId: number, updatedData: Partial<BookLoan>): Promise<BookLoan> {
    const updated = await this.repository.updateLoan(loanId, updatedData);
    if (!updated) throw new Error(`Loan with ID ${loanId} not found.`);
    return updated;
  }

  async deleteLoan(loanId: number): Promise<void> {
    const success = await this.repository.deleteLoan(loanId);
    if (!success) throw new Error(`Loan with ID ${loanId} not found.`);
  }
}
