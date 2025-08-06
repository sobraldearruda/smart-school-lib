import { Teacher } from "../../models/teacher";

export interface ITeacherService {
  createTeacher(userData: any): Promise<Teacher>;
  getAllTeachers(): Promise<Teacher[]>;
  getTeacherByRegistration(userRegistration: string): Promise<Teacher>;
  updateTeacher(userRegistration: string, updatedData: Partial<Omit<Teacher, "userId">>): Promise<Teacher>;
  deleteTeacher(userRegistration: string): Promise<Teacher | string>;
  authenticate(userRegistration: string, userPassword: string): Promise<{ user: Teacher, token: string }>;
}
