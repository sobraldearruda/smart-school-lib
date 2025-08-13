import { Router } from "express";
import { TeacherController } from "../controllers/teacherController";
import { TeacherService } from "../services/implementations/teacherService";
import { authenticateJWT, authorizeLibrarian } from "../middlewares/authMiddleware";

const teacherService = new TeacherService();
const teacherController = new TeacherController(teacherService);

const router = Router();

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Creates a new teacher
 *     tags: [Teachers]
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
 *         description: Teacher created successfully
 *       400:
 *         description: Bad Request
 */
router.post("/teachers", async (req, res, next) => {
    try {
        await teacherController.createTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Returns a list of all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: A list of teachers
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
router.get("/teachers", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.getAllTeachers(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /teachers/{userRegistration}:
 *   get:
 *     summary: Get a teacher by registration (Authentication required)
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration of the teacher to query
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
 *         description: Teacher found
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.get("/teachers/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.getTeacherByRegistration(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /teachers/{userRegistration}:
 *   put:
 *     summary: Update a teacher by registration (Authentication required)
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration of the teacher to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userRegistration
 *               - userPassword
 *               - userName
 *               - userEmail
 *             properties:
 *               userRegistration:
 *                 type: string
 *               userPassword:
 *                 type: string
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.put("/teachers/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.updateTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /teachers/{userRegistration}:
 *   delete:
 *     summary: Delete a teacher by registration (Authentication required)
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration of the teacher to delete
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
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.delete("/teachers/:userRegistration", authenticateJWT, authorizeLibrarian, async (req, res, next) => {
    try {
        await teacherController.deleteTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /teachers/login:
 *   post:
 *     summary: Authenticates a teacher and returns a token
 *     tags: [Teachers]
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
router.post("/teachers/login", async (req, res, next) => {
    try {
        await teacherController.loginTeacher(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
