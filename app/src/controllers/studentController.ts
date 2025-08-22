import { Request, Response } from "express";
import { IStudentService } from "../services/interfaces/iStudentService";

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
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllStudents(req: Request, res: Response): Promise<Response> {
    try {
      const students = await this.studentService.getAllStudents();
      return res.status(200).json(students);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getStudentByRegistration(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.params;
      const student = await this.studentService.getStudentByRegistration(userRegistration);
      return res.status(200).json(student);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async updateStudent(req: Request, res: Response): Promise<Response> {
    try {
      const updatedData = req.body;
      const { userRegistration } = req.params;
      const student = await this.studentService.updateStudent(userRegistration, updatedData);
      return res.status(200).json(student);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === "Permission denied") {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.params;
      const deletedStudent = await this.studentService.deleteStudent(userRegistration);
      return res.status(204).json({ message: "Student deleted successfully.", deletedStudent });
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === "Permission denied") {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === "Not authenticated") {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async loginStudent(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration, userPassword } = req.params;
      const authResult = await this.studentService.authenticate(userRegistration, userPassword);
      return res.status(200).json(authResult);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
