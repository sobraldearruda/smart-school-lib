/*
import { TeacherRepository } from "../repositories/teacherRepository";
import { Teacher } from "../models/teacher";
import { UserNotFoundException } from "../exceptions/userNotFoundException";
import { DuplicateRegistrationException } from "../exceptions/duplicateRegistrationException";

export class TeacherService {
  private repository: TeacherRepository;

  constructor() {
    this.repository = new TeacherRepository();
  }

  async createTeacher(userName: string, userEmail: string, userRegistration: string): Promise<Teacher> {
    try {
      const existing = await this.repository.getTeacherByRegistration(userRegistration);
      if (existing) {
        throw new DuplicateRegistrationException(`Registration ${userRegistration} already in use.`);
      }
    } catch (error) {
      if (!(error instanceof UserNotFoundException)) {
        throw error;
      }
    }
    if (!userName || !userEmail || !userRegistration) {
      throw new Error("All fields required.");
    }
    return await this.repository.createTeacher(userName.trim(), userEmail.trim(), userRegistration.trim());
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.repository.getAllTeachers();
  }

  async getStudentByRegistration(userRegistration: string): Promise<Teacher> {
    return await this.repository.getTeacherByRegistration(userRegistration);
  }

  async updateStudent(userRegistration: string, updatedData: Partial<Omit<Student, "userId">>): Promise<Student> {
    if (Object.keys(updatedData).length === 0) {
      throw new Error("No content informed.");
    }
    return await this.repository.updateStudent(userRegistration, updatedData);
  }

  async deleteStudent(userRegistration: string): Promise<Student> {
    return await this.repository.deleteStudent(userRegistration);
  }
}
*/