import { Router } from "express";
import { BookLoanController } from "../controllers/bookLoanController";
import { BookLoanService } from "../services/implementations/bookLoanService";
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const router = Router();

const bookLoanService = new BookLoanService();
const bookLoanController = new BookLoanController(bookLoanService);

router.post("/book-loans", async (req, res, next) => {
    try {
        await bookLoanController.createLoan(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/book-loans", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await bookLoanController.getAllLoans(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.get("/book-loans/:loanId", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await bookLoanController.getLoanById(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.put("/book-loans/:loanId", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await bookLoanController.updateLoan(req, res);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/book-loans/:loanId", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await bookLoanController.deleteLoan(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
