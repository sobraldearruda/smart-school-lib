import { Request, Response } from "express";
import { TeacherService } from "../services/teacherService";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class TeacherController {
  private service: TeacherService;

  constructor() {
    this.service = new TeacherService();
  }

  createTeacher = async (req: Request, res: Response) => {
    try {
      const { userName, userEmail, userRegistration } = req.body;
      const teacher = await this.service.createTeacher(userName, userEmail, userRegistration);
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to create user.", error: (error as Error).message });
    }
  };

  getAllTeacher = async (_req: Request, res: Response) => {
    try {
      const teachers = await this.service.getAllTeachers();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: "It is not possible to query users.", error: (error as Error).message });
    }
  };

  getTeacherByRegistration = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const teacher = await this.service.getTeacherByRegistration(userRegistration);
      res.status(200).json(teacher);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to query user.", error: (error as Error).message });
      }
    }
  };

  updateTeacher = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const updatedData = req.body;
      const teacher = await this.service.updateTeacher(userRegistration, updatedData);
      res.status(200).json(teacher);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to update user.", error: (error as Error).message });
      }
    }
  };

  deleteTeacher = async (req: Request, res: Response) => {
    try {
      const { userRegistration } = req.params;
      const deletedTeacher = await this.service.deleteTeacher(userRegistration);
      res.status(200).json({ message: "Teacher deleted successfully.", deletedTeacher });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "It is not possible to delete user.", error: (error as Error).message });
      }
    }
  };
}
