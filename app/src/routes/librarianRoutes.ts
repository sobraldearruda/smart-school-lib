import { Router } from "express";
import { LibrarianController } from "../controllers/librarianController";
import { LibrarianService } from "../services/librarianService";

const librarianService = new LibrarianService();
const librarianController = new LibrarianController(librarianService);

const router = Router();

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
 *               - userPassword
 *             properties:
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               userRegistration:
 *                 type: string
 *               userPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Librarian created successfully
 *       400:
 *         description: Bad Request
 */
router.post("/librarians", async (req, res, next) => {
    try {
        await librarianController.createLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

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
 *                   userId:
 *                     type: number
 *                   userName:
 *                     type: string
 *                   userEmail:
 *                     type: string
 *                   userRegistration:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/librarians", async (req, res, next) => {
    try {
        await librarianController.getAllLibrarians(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /librarians/{userRegistration}:
 *   get:
 *     summary: Get a librarian by registration (Authentication required)
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
 *             required:
 *               - userPassword
 *             properties:
 *               userPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Librarian found
 *       404:
 *         description: Librarian not found
 *       500:
 *         description: Internal server error
 */
router.get("/librarians/:userRegistration", async (req, res, next) => {
    try {
        await librarianController.getLibrarianByRegistration(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /librarians/{userRegistration}:
 *   put:
 *     summary: Update a librarian by registration (Authentication required)
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
 *             required:
 *               - userPassword
 *               - userName
 *               - userEmail
 *             properties:
 *               userPassword:
 *                 type: string
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
router.put("/librarians/:userRegistration", async (req, res, next) => {
    try {
        await librarianController.updateLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /librarians/{userRegistration}:
 *   delete:
 *     summary: Delete a librarian by registration (Authentication required)
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
 *             required:
 *               - userPassword
 *             properties:
 *               userPassword:
 *                 type: string
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
router.delete("/librarians/:userRegistration", async (req, res, next) => {
    try {
        await librarianController.deleteLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /librarians/login:
 *   post:
 *     summary: Authenticates a librarian and returns a token
 *     tags: [Librarians]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userRegistration
 *               - userPassword
 *             properties:
 *               userRegistration:
 *                 type: string
 *               userPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                     userRegistration:
 *                       type: string
 *                     userEmail:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/librarians/login", async (req, res, next) => {
    try {
        await librarianController.loginLibrarian(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
