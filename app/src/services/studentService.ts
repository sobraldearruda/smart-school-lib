import { StudentRepository } from "../repositories/studentRepository";
import { Student } from "../models/student";
import { UserNotFoundException } from "../exceptions/userNotFoundException";
import { DuplicateRegistrationException } from "../exceptions/duplicateRegistrationException";

export class StudentService {
  private repository: StudentRepository;

  constructor() {
    this.repository = new StudentRepository();
  }

  async createStudent(userName: string, userEmail: string, userRegistration: string): Promise<Student> {
    try {
      const existing = await this.repository.getStudentByRegistration(userRegistration);
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
    return await this.repository.createStudent(userName.trim(), userEmail.trim(), userRegistration.trim());
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.repository.getAllStudents();
  }

  async getStudentByRegistration(userRegistration: string): Promise<Student> {
    return await this.repository.getStudentByRegistration(userRegistration);
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
