import { Teacher } from "../models/Teacher";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";

export class TeacherRepository {

  async createTeacher(userName: string, userEmail: string, userRegistration: string) {
    return await Teacher.create({
      userName,
      userEmail,
      userRegistration,
    });
  }
  
  async getAllTeachers() {
    return await Teacher.findAll();
  }
  
  async getTeacherByRegistration(userRegistration: string) {
    const teacher = await Teacher.findOne({ where: { userRegistration } });
    if (!teacher) {
      throw new UserNotFoundException(`Teacher with registration ${userRegistration} not found.`);
    }
    return teacher;
  }
  
  async updateTeacher(userRegistration: string, updatedData: Partial<Omit<Teacher, "userId">>) {
    const teacher = await Teacher.findOne({ where: { userRegistration } });
    if (!teacher) {
      throw new UserNotFoundException(`Teacher with registration ${userRegistration} not found.`);
    }
    return await teacher.update(updatedData);
  }

  async deleteTeacher(userRegistration: string) {
    const teacher = await Teacher.findOne({ where: { userRegistration } });
    if (!teacher) {
      throw new UserNotFoundException(`Teacher with registration ${userRegistration} not found.`);
    }
    await teacher.destroy();
    return teacher;
  }
}
