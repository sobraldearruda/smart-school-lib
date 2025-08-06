import { Router } from "express";
import { BookLoanController } from "../controllers/bookLoanController";
import { BookLoanService } from "../services/implementations/bookLoanService";

const router = Router();

const bookLoanService = new BookLoanService();
const bookLoanController = new BookLoanController(bookLoanService);

router.post("/book-loans", bookLoanController.createLoan);

router.get("/book-loans", bookLoanController.getAllLoans);

router.get("/book-loans/:loanId", bookLoanController.getLoanById);

router.put("/book-loans/:loanId", bookLoanController.updateLoan);

router.delete("/book-loans/:loanId", bookLoanController.deleteLoan);

export default router;
