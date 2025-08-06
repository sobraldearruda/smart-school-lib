import { Router } from "express";
import { BookLoanController } from "../controllers/bookLoanController";

const router = Router();
const bookLoanController = new BookLoanController();

router.post("/book-loans", bookLoanController.createLoan);

router.get("/book-loans", bookLoanController.getAllLoans);

router.get("/book-loans/:loanId", bookLoanController.getLoanById);

router.put("/book-loans/:loanId", bookLoanController.updateLoan);

router.delete("/book-loans/:loanId", bookLoanController.deleteLoan);

export default router;
