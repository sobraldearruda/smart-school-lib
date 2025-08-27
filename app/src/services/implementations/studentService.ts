import { StudentRepository } from "../../repositories/studentRepository";
import { Student } from "../../models/student";
import { DuplicateRegistrationException } from "../../exceptions/duplicateRegistrationException";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { IStudentService } from "../interfaces/iStudentService";

export class StudentService implements IStudentService {

  private repository = new StudentRepository();
  private jwtSecret: jwt.Secret = (process.env.JWT_SECRET || "defaultSecret") as jwt.Secret;

  private validateUserData(userData: any) {
    if (!userData.userName || !userData.userEmail || !userData.userRegistration || !userData.userPassword) {
      throw new Error("All fields required.");
    }
  }

  async createStudent(userData: any): Promise<Student> {
    this.validateUserData(userData);
    const existing = await this.repository.getStudentByRegistration(userData.userRegistration);
    if (existing) throw new DuplicateRegistrationException(`Registration ${userData.userRegistration} already in use.`);
    const hashedPassword = await bcrypt.hash(userData.userPassword, 10);
    const userWithHashedPass = { ...userData, userPassword: hashedPassword };
    return await this.repository.createStudent(userWithHashedPass);
  }

  async getAllStudents(): Promise<Student[]> {
    const students = await this.repository.getAllStudents();
    if (!students) throw new Error("No students found.");
    return students;
  }

  async getStudentByRegistration(userRegistration: string): Promise<Student> {
    if (!userRegistration) throw new Error("User registration required.");
    const student = await this.repository.getStudentByRegistration(userRegistration);
    if (!student) throw new Error(`Student with registration ${userRegistration} not found.`);
    return student;
  }

  async updateStudent(userRegistration: string, updatedData: Partial<Omit<Student, "userId">>): Promise<Student> {
    if (!userRegistration) throw new Error("User registration required.");
    const existing = await this.repository.getStudentByRegistration(userRegistration);
    if (!existing) throw new Error(`Student with registration ${userRegistration} not found.`);
    if (updatedData.userPassword) {
      updatedData.userPassword = await bcrypt.hash(updatedData.userPassword, 10);
    }
    if (updatedData.userRegistration && updatedData.userRegistration !== userRegistration) {
      const registrationInUse = await this.repository.getStudentByRegistration(updatedData.userRegistration);
      if (registrationInUse) throw new DuplicateRegistrationException(`Registration ${updatedData.userRegistration} already in use.`);
    }
    this.validateUserData({ ...existing.toJSON(), ...updatedData });
    return await this.repository.updateStudent(userRegistration, updatedData);
  }

  async deleteStudent(userRegistration: string): Promise<Student | string> {
    if (!userRegistration) throw new Error("User registration required.");
    const existing = await this.repository.getStudentByRegistration(userRegistration);
    if (!existing) throw new Error(`Student with registration ${userRegistration} not found.`);
    return await this.repository.deleteStudent(userRegistration);
  }

  async authenticate(userRegistration: string, userPassword: string) {
    if (!userRegistration || !userPassword) throw new Error("User registration and password required.");
    const user = await this.repository.getStudentByRegistration(userRegistration);
    if (!user) throw new Error(`Student with registration ${userRegistration} not found.`);
    const passwordOk = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordOk) throw new Error("Invalid user or password.");
    const payload = { id: user.userId, registration: user.userRegistration };
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    return { user, token };
  }
}
