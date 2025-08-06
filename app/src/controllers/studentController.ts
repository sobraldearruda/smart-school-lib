import { Request, Response } from "express";
import { IStudentService } from "../services/interfaces/iStudentService";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class StudentController {

  private studentService: IStudentService;

  constructor(service: IStudentService) {
    this.studentService = service;
  }

  async createStudent(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const student = await this.studentService.createStudent(userData);
      return res.status(201).json(student);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllStudents(req: Request, res: Response): Promise<Response> {
    try {
      const students = await this.studentService.getAllStudents();
      return res.json(students);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getStudentByRegistration(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.body;
      const student = await this.studentService.getStudentByRegistration(userRegistration);
      return res.json(student);
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async updateStudent(req: Request, res: Response): Promise<Response> {
    try {
      const updatedData = req.body;
      const { userRegistration } = req.body;
      const student = await this.studentService.updateStudent(userRegistration, updatedData);
      return res.json(student);
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.body;
      const deletedStudent = await this.studentService.deleteStudent(userRegistration);
      return res.json({ message: "Student deleted successfully.", deletedStudent });
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async loginStudent(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration, userPassword } = req.body;
      const authResult = await this.studentService.authenticate(userRegistration, userPassword);
      return res.json(authResult);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
