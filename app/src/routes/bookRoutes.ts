import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();
const controller = new BookController();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Creates a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookTitle
 *               - bookIsbn
 *               - bookPublicationYear
 *             properties:
 *               bookTitle:
 *                 type: string
 *               bookIsbn:
 *                 type: string
 *               bookPublicationYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/books", controller.createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookTitle:
 *                     type: string
 *                   bookIsbn:
 *                     type: string
 *                   bookPublicationYear:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */
router.get("/books", controller.getAllBooks);

/**
 * @swagger
 * /books/{bookTitle}:
 *   get:
 *     summary: Get a book by title
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookTitle
 *         required: true
 *         schema:
 *           type: string
 *         description: Title of the book
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookTitle:
 *                   type: string
 *                 bookIsbn:
 *                   type: string
 *                 bookPublicationYear:
 *                   type: integer
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get("/books/:bookTitle", controller.getBookByTitle);

/**
 * @swagger
 * /books/{bookTitle}:
 *   put:
 *     summary: Update a book by title
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookTitle
 *         required: true
 *         schema:
 *           type: string
 *         description: Title of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookIsbn:
 *                 type: string
 *               bookPublicationYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put("/books/:bookTitle", controller.updateBook);

/**
 * @swagger
 * /books/{bookTitle}:
 *   delete:
 *     summary: Delete a book by title
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookTitle
 *         required: true
 *         schema:
 *           type: string
 *         description: Title of the book
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedBook:
 *                   type: object
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete("/books/:bookTitle", controller.deleteBook);

export default router;
