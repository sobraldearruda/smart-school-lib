import { Request, Response } from "express";
import { ITeacherService } from "../services/interfaces/iTeacherService";

export class TeacherController {

  private teacherService: ITeacherService;

  constructor(service: ITeacherService) {
    this.teacherService = service;
  }

  async createTeacher(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const teacher = await this.teacherService.createTeacher(userData);
      return res.status(201).json(teacher);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllTeachers(req: Request, res: Response): Promise<Response> {
    try {
      const teachers = await this.teacherService.getAllTeachers();
      return res.status(200).json(teachers);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getTeacherByRegistration(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.params;
      const teacher = await this.teacherService.getTeacherByRegistration(userRegistration);
      return res.status(200).json(teacher);
    } catch (error: any) {
      if (error instanceof Error && error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async updateTeacher(req: Request, res: Response): Promise<Response> {
    try {
      const updatedData = req.body;
      const { userRegistration } = req.params;
      const teacher = await this.teacherService.updateTeacher(userRegistration, updatedData);
      return res.status(200).json(teacher);
    } catch (error: any) {
      if (error instanceof Error && error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteTeacher(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration } = req.params;
      const deletedTeacher = await this.teacherService.deleteTeacher(userRegistration);
      return res.status(204).json({ message: "Teacher deleted successfully.", deletedTeacher });
    } catch (error: any) {
      if (error instanceof Error && error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async loginTeacher(req: Request, res: Response): Promise<Response> {
    try {
      const { userRegistration, userPassword } = req.params;
      const authResult = await this.teacherService.authenticate(userRegistration, userPassword);
      return res.status(200).json(authResult);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
