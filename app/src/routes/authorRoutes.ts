import { Router } from "express";
import { AuthorController } from "../controllers/authorController";
import { AuthorService } from "../services/implementations/authorService"; 

const router = Router();
const authorService = new AuthorService();
const controller = new AuthorController(authorService);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Creates a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorName
 *               - authorBiography
 *             properties:
 *               authorName:
 *                 type: string
 *               authorBiography:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/authors", controller.createAuthor);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Returns a list of all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   authorName:
 *                     type: string
 *                   authorBiography:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/authors", controller.getAllAuthors);

/**
 * @swagger
 * /authors/{authorName}:
 *   get:
 *     summary: Get an author by name
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the author
 *     responses:
 *       200:
 *         description: Author found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authorName:
 *                   type: string
 *                 authorBiography:
 *                   type: string
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get("/authors/:authorName", controller.getAuthorByName);

/**
 * @swagger
 * /authors/{authorName}:
 *   put:
 *     summary: Update an author by name
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorBiography:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.put("/authors/:authorName", controller.updateAuthor);

/**
 * @swagger
 * /authors/{authorName}:
 *   delete:
 *     summary: Delete an author by name
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the author
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedAuthor:
 *                   type: object
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.delete("/authors/:authorName", controller.deleteAuthor);

export default router;
