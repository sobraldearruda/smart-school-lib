import { Router } from "express";
import { StudentController } from "../controllers/studentController";
import { StudentService } from "../services/implementations/studentService";

const studentService = new StudentService();
const studentController = new StudentController(studentService);

const router = Router();

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
 *         description: Student created successfully
 *       400:
 *         description: Bad Request
 */
router.post("/students", async (req, res, next) => {
    try {
        await studentController.createStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

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
router.get("/students", async (req, res, next) => {
    try {
        await studentController.getAllStudents(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /students/{userRegistration}:
 *   get:
 *     summary: Get a student by registration (Authentication required)
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
 *             required:
 *               - userPassword
 *             properties:
 *               userPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get("/students/:userRegistration", async (req, res, next) => {
    try {
        await studentController.getStudentByRegistration(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /students/{userRegistration}:
 *   put:
 *     summary: Update a student by registration (Authentication required)
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
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put("/students/:userRegistration", async (req, res, next) => {
    try {
        await studentController.updateStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /students/{userRegistration}:
 *   delete:
 *     summary: Delete a student by registration (Authentication required)
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
 *             required:
 *               - userPassword
 *             properties:
 *               userPassword:
 *                 type: string
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
router.delete("/students/:userRegistration", async (req, res, next) => {
    try {
        await studentController.deleteStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /students/login:
 *   post:
 *     summary: Authenticates a student and returns a token
 *     tags: [Students]
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
router.post("/students/login", async (req, res, next) => {
    try {
        await studentController.loginStudent(req, res);
    } catch (error: any) {
        next(error);
    }
});

export default router;
