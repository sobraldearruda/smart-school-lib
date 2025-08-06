import { Student } from "../../models/student";

export interface IStudentService {
  createStudent(userData: any): Promise<Student>;
  getAllStudents(): Promise<Student[]>;
  getStudentByRegistration(userRegistration: string): Promise<Student>;
  updateStudent(userRegistration: string, updatedData: Partial<Omit<Student, "userId">>): Promise<Student>;
  deleteStudent(userRegistration: string): Promise<Student | string>;
  authenticate(userRegistration: string, userPassword: string): Promise<{ user: Student, token: string }>;
}
