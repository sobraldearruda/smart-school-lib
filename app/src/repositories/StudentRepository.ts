import { Student } from "../models/Student";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";

export class StudentRepository {

  async createStudent(userName: string, userEmail: string, userRegistration: string) {
    return await Student.create({
      userName,
      userEmail,
      userRegistration,
    });
  }
  
  async getAllStudents() {
    return await Student.findAll();
  }
  
  async getStudentByRegistration(userRegistration: string) {
    const student = await Student.findOne({ where: { userRegistration } });
    if (!student) {
      throw new UserNotFoundException(`Student with registration ${userRegistration} not found.`);
    }
    return student;
  }
  
  async updateStudent(userRegistration: string, updatedData: Partial<Omit<Student, "userId">>) {
    const student = await Student.findOne({ where: { userRegistration } });
    if (!student) {
      throw new UserNotFoundException(`Student with registration ${userRegistration} not found.`);
    }
    return await student.update(updatedData);
  }

  async deleteStudent(userRegistration: string) {
    const student = await Student.findOne({ where: { userRegistration } });
    if (!student) {
      throw new UserNotFoundException(`Student with registration ${userRegistration} not found.`);
    }
    await student.destroy();
    return student;
  }
}
