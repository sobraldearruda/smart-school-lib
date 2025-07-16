import { Request, Response } from "express";
import { StudentService } from "../services/studentService";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class StudentController {
  private service: StudentService;

  constructor() {
    this.service = new StudentService();
  }

  createStudent = async (req: Request, res: Response) => {
    try {
      const { userName, userEmail, userRegistration } = req.body;
      const student = await this.service.createStudent(userName, userEmail, userRegistration);
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to create user.", error: (error as Error).message });
    }
  };

  getAllStudents = async (_req: Request, res: Response) => {
    try {
      const students = await this.service.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query users.", error: (error as Error).message });
    }
  };

  getStudentByRegistration = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const student = await this.service.getStudentByRegistration(userRegistration);
      res.status(200).json(student);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to query user.", error: (error as Error).message });
      }
    }
  };

  updateStudent = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const updatedData = req.body;
      const student = await this.service.updateStudent(userRegistration, updatedData);
      res.status(200).json(student);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to update user.", error: (error as Error).message });
      }
    }
  };

  deleteStudent = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const deletedStudent = await this.service.deleteStudent(userRegistration);
      res.status(200).json({ message: "Student deleted successfully.", deletedStudent });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to delete user.", error: (error as Error).message });
      }
    }
  };
}
