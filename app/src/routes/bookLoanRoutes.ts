import { Router } from "express";
import { BookLoanController } from "../controllers/bookLoanController";
import { BookLoanService } from "../services/implementations/bookLoanService";
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const router = Router();

const bookLoanService = new BookLoanService();
const bookLoanController = new BookLoanController(bookLoanService);

router.post("/book-loans", bookLoanController.createLoan);

router.get("/book-loans", authenticateJWT, authorizeLibrarian, bookLoanController.getAllLoans);

router.get("/book-loans/:loanId", authenticateJWT, authorizeLibrarian, bookLoanController.getLoanById);

router.put("/book-loans/:loanId", authenticateJWT, authorizeLibrarian, bookLoanController.updateLoan);

router.delete("/book-loans/:loanId", authenticateJWT, authorizeLibrarian, bookLoanController.deleteLoan);

export default router;
