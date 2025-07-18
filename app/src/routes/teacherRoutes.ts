import { Router } from "express";
import { TeacherController } from "../controllers/teacherController";

const router = Router();
const controller = new TeacherController();

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
 *             properties:
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               userRegistration:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/teachers", controller.createTeacher);

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
 *                   userName:
 *                     type: string
 *                   userEmail:
 *                     type: string
 *                   userRegistration:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/teachers", controller.getAllTeachers);

/**
 * @swagger
 * /teachers/{userRegistration}:
 *   get:
 *     summary: Get a teacher by registration
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher registration number
 *     responses:
 *       200:
 *         description: Teacher found
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
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.get("/teachers/:userRegistration", controller.getTeacherByRegistration);

/**
 * @swagger
 * /teachers/{userRegistration}:
 *   put:
 *     summary: Update a teacher by registration
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher registration number
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
 *         description: Teacher updated successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.put("/teachers/:userRegistration", controller.updateTeacher);

/**
 * @swagger
 * /teachers/{userRegistration}:
 *   delete:
 *     summary: Delete a teacher by registration
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: userRegistration
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher registration number
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedTeacher:
 *                   type: object
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.delete("/teachers/:userRegistration", controller.deleteTeacher);

export default router;
