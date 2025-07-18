import { Router } from "express";
import { LibrarianController } from "../controllers/librarianController";

const router = Router();
const controller = new LibrarianController();

/**
 * @swagger
 * /librarians:
 *   post:
 *     summary: Creates a new librarian
 *     tags: [Librarians]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - userEmail
 *               - userRegistration
 *             properties:
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               userRegistration:
 *                 type: string
 *     responses:
 *       201:
 *         description: Librarian created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/librarians", controller.createLibrarian);

/**
 * @swagger
 * /librarians:
 *   get:
 *     summary: Returns a list of all librarians
 *     tags: [Librarians]
 *     responses:
 *       200:
 *         description: A list of librarians
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   userEmail:
 *                     type: string
 *                   userRegistration:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/librarians", controller.getAllLibrarians);

/**
 * @swagger
 * /librarians/{userRegistration}:
 *   get:
 *     summary: Get a librarian by registration
 *     tags: [Librarians]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Librarian registration number
 *     responses:
 *       200:
 *         description: Librarian found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                 userEmail:
 *                   type: string
 *                 userRegistration:
 *                   type: string
 *       404:
 *         description: Librarian not found
 *       500:
 *         description: Internal server error
 */
router.get("/librarians/:userRegistration", controller.getLibrarianByRegistration);

/**
 * @swagger
 * /librarians/{userRegistration}:
 *   put:
 *     summary: Update a librarian by registration
 *     tags: [Librarians]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Librarian registration number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Librarian updated successfully
 *       404:
 *         description: Librarian not found
 *       500:
 *         description: Internal server error
 */
router.put("/librarians/:userRegistration", controller.updateLibrarian);

/**
 * @swagger
 * /librarians/{userRegistration}:
 *   delete:
 *     summary: Delete a librarian by registration
 *     tags: [Librarians]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Librarian registration number
 *     responses:
 *       200:
 *         description: Librarian deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedLibrarian:
 *                   type: object
 *       404:
 *         description: Librarian not found
 *       500:
 *         description: Internal server error
 */
router.delete("/librarians/:userRegistration", controller.deleteLibrarian);

export default router;
