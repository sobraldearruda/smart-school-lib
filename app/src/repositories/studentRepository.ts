import { Student } from "../models/student";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class StudentRepository {

  async createStudent(userData: Partial<Student>): Promise<Student> {
    return Student.create(userData);
  }
  
  async getAllStudents() {
    return await Student.findAll();
  }
  
  async getStudentByRegistration(userRegistration: string): Promise<Student | null> {
    return await Student.findOne({ where: { userRegistration } });
  }
  
  async updateStudent(userRegistration: string, updatedData: Partial<Omit<Student, "userId">>): Promise<Student> {
    const student = await Student.findOne({ where: { userRegistration } });
    if (!student) {
      throw new UserNotFoundException(`Student with registration ${userRegistration} not found.`);
    }
    return await student.update(updatedData);
  }

  async deleteStudent(userRegistration: string): Promise<string> {
    return (await Student.destroy({ where: { userRegistration } })).toString();
  }
}
