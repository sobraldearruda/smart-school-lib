import { Request, Response } from "express";
import { BookLoanService } from "../services/bookLoanService";

export class BookLoanController {
  private service: BookLoanService;

  constructor() {
    this.service = new BookLoanService();
  }

  createLoan = async (req: Request, res: Response) => {
    try {
      const loan = await this.service.createLoan(req.body);
      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to create loan.", error: (error as Error).message });
    }
  };

  getAllLoans = async (_req: Request, res: Response) => {
    try {
      const loans = await this.service.getAllLoans();
      res.status(200).json(loans);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query loans.", error: (error as Error).message });
    }
  };

  getLoanById = async (req: Request, res: Response) => {
    try {
      const loan = await this.service.getLoanById(Number(req.params.loanId));
      res.status(200).json(loan);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query loan.", error: (error as Error).message });
    }
  };

  updateLoan = async (req: Request, res: Response) => {
    try {
      const loan = await this.service.updateLoan(Number(req.params.loanId), req.body);
      res.status(200).json(loan);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to update loan.", error: (error as Error).message });
    }
  };

  deleteLoan = async (req: Request, res: Response) => {
    try {
      await this.service.deleteLoan(Number(req.params.loanId));
      res.status(200).json({ message: "Loan deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "It is not possible to delete loan.", erro: (error as Error).message });
    }
  };
}
