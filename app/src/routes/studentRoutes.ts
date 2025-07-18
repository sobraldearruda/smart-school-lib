import { Router } from "express";
import { StudentController } from "../controllers/studentController";

const router = Router();
const controller = new StudentController();

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Creates a new student
 *     tags: [Students]
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
 *         description: Student created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/students", controller.createStudent);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Returns a list of all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students
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
router.get("/students", controller.getAllStudents);

/**
 * @swagger
 * /students/{userRegistration}:
 *   get:
 *     summary: Get a student by registration
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Student registration number
 *     responses:
 *       200:
 *         description: Student found
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
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get("/students/:userRegistration", controller.getStudentByRegistration);

/**
 * @swagger
 * /students/{userRegistration}:
 *   put:
 *     summary: Update a student by registration
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Student registration number
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
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put("/students/:userRegistration", controller.updateStudent);

/**
 * @swagger
 * /students/{userRegistration}:
 *   delete:
 *     summary: Delete a student by registration
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Student registration number
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedStudent:
 *                   type: object
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.delete("/students/:userRegistration", controller.deleteStudent);

export default router;
