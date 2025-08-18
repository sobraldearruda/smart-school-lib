import { TeacherRepository } from "../../repositories/teacherRepository";
import { Teacher } from "../../models/teacher";
import { DuplicateRegistrationException } from "../../exceptions/duplicateRegistrationException";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ITeacherService } from "../interfaces/iTeacherService";

export class TeacherService implements ITeacherService {

  private repository = new TeacherRepository();
  private jwtSecret: jwt.Secret = (process.env.JWT_SECRET || "defaultSecret") as jwt.Secret;

  private validateUserData(userData: any) {
    if (!userData.userName || !userData.userEmail || !userData.userRegistration || !userData.userPassword) {
      throw new Error("All fields required.");
    }
  }

  async createTeacher(userData: any): Promise<Teacher> {
    const existing = await this.repository.getTeacherByRegistration(userData.userRegistration);
    if (existing) throw new DuplicateRegistrationException(`Registration ${userData.userRegistration} already in use.`);
    this.validateUserData(userData);
    const hashedPassword = await bcrypt.hash(userData.userPassword, 10);
    const userWithHashedPass = { ...userData, userPassword: hashedPassword };
    return await this.repository.createTeacher(userWithHashedPass);
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.repository.getAllTeachers();
  }

  async getTeacherByRegistration(userRegistration: string): Promise<Teacher> {
    const teacher = await this.repository.getTeacherByRegistration(userRegistration);
    if (!teacher) throw new Error(`Teacher with registration ${userRegistration} not found.`);
    return teacher;
  }

  async updateTeacher(userRegistration: string, updatedData: Partial<Omit<Teacher, "userId">>): Promise<Teacher> {
    const existing = await this.repository.getTeacherByRegistration(userRegistration);
    if (!existing) throw new Error(`Teacher with registration ${userRegistration} not found.`);
    if (updatedData.userPassword) {
      updatedData.userPassword = await bcrypt.hash(updatedData.userPassword, 10);
    }
    if (updatedData.userRegistration && updatedData.userRegistration !== userRegistration) {
      const registrationInUse = await this.repository.getTeacherByRegistration(updatedData.userRegistration);
      if (registrationInUse) throw new DuplicateRegistrationException(`Registration ${updatedData.userRegistration} already in use.`);
    }
    this.validateUserData({ ...existing.toJSON(), ...updatedData });
    return await this.repository.updateTeacher(userRegistration, updatedData);
  }

  async deleteTeacher(userRegistration: string): Promise<Teacher | string> {
    const existing = await this.repository.getTeacherByRegistration(userRegistration);
    if (!existing) throw new Error(`Teacher with registration ${userRegistration} not found.`);
    return await this.repository.deleteTeacher(userRegistration);
  }

  async authenticate(userRegistration: string, userPassword: string) {
    const user = await this.repository.getTeacherByRegistration(userRegistration);
    if (!user) throw new Error(`Teacher with registration ${userRegistration} not found.`);
    const passwordOk = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordOk) throw new Error("Invalid user or password.");
    const payload = { id: user.userId, registration: user.userRegistration };
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    return { user, token };
  }
}
