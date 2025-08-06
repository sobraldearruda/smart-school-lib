import { BookLoan } from '../models/bookLoan';

export class BookLoanRepository {

  async createLoan(loanData: Partial<BookLoan>): Promise<BookLoan> {
    return await BookLoan.create(loanData);
  }

  async getAllLoans(): Promise<BookLoan[]> {
    return await BookLoan.findAll();
  }

  async getLoanById(loanId: number): Promise<BookLoan | null> {
    return await BookLoan.findByPk(loanId);
  }

  async updateLoan(loanId: number, updatedData: Partial<BookLoan>): Promise<BookLoan | null> {
    const loan = await BookLoan.findByPk(loanId);
    if (!loan) return null;
    await loan.update(updatedData);
    return loan;
  }

  async deleteLoan(loanId: number): Promise<string> {
    return (await BookLoan.destroy({ where: { loanId } })).toString();
  }
}
