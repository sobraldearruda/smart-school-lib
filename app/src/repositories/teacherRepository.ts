import { Teacher } from "../models/teacher";
import { UserNotFoundException } from "../exceptions/userNotFoundException";

export class TeacherRepository {

  async createTeacher(userData: Partial<Teacher>): Promise<Teacher> {
    return Teacher.create(userData);
  }
  
  async getAllTeachers() {
    return await Teacher.findAll();
  }
  
  async getTeacherByRegistration(userRegistration: string): Promise<Teacher | null> {
    return await Teacher.findOne({ where: { userRegistration } });
  }
  
  async updateTeacher(userRegistration: string, updatedData: Partial<Omit<Teacher, "userId">>): Promise<Teacher> {
    const teacher = await Teacher.findOne({ where: { userRegistration } });
    if (!teacher) {
      throw new UserNotFoundException(`Teacher with registration ${userRegistration} not found.`);
    }
    return await teacher.update(updatedData);
  }

  async deleteTeacher(userRegistration: string): Promise<string> {
    return (await Teacher.destroy({ where: { userRegistration } })).toString();
  }
}
