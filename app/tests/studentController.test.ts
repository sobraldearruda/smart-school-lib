import { StudentController } from "../src/controllers/studentController";
import { IStudentService } from "../src/services/interfaces/iStudentService";
import { Request, Response } from "express";

describe("StudentController", () => {
  let studentService: jest.Mocked<IStudentService>;
  let studentController: StudentController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    studentService = {
      createStudent: jest.fn(),
      getAllStudents: jest.fn(),
      getStudentByRegistration: jest.fn(),
      updateStudent: jest.fn(),
      deleteStudent: jest.fn(),
      authenticate: jest.fn(),
    };

    studentController = new StudentController(studentService);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  const mockStudent = {
    userId: 1,
    userName: "Rafael Sobral",
    userEmail: "rafael.sobral@email.com",
    userRegistration: "12345",
    userPassword: "54321",
  } as any;

  // createStudent
  it("should create a student successfully", async () => {
    req = { body: mockStudent };
    studentService.createStudent.mockResolvedValue(mockStudent);

    await studentController.createStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });

  it("should return 400 when creation failed", async () => {
    req = { body: mockStudent };
    studentService.createStudent.mockRejectedValue(new Error("Invalid data"));

    await studentController.createStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid data" });
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    req = { body: mockStudent };
    studentService.createStudent.mockRejectedValue(new Error("Not authenticated"));

    await studentController.createStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // getAllStudents
  it("should return all students successfully", async () => {
    const students = [mockStudent];
    studentService.getAllStudents.mockResolvedValue(students);

    await studentController.getAllStudents({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(students);
  });

  it("should return 500 when query failed", async () => {
    studentService.getAllStudents.mockRejectedValue(new Error("Database error"));

    await studentController.getAllStudents({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
  });

  // getStudentByRegistration
  it("should return a student by registration", async () => {
    req = { params: { userRegistration: "123" } };
    studentService.getStudentByRegistration.mockResolvedValue(mockStudent);

    await studentController.getStudentByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });

  it("should return 404 when query not found", async () => {
    req = { params: { userRegistration: "123" } };
    studentService.getStudentByRegistration.mockRejectedValue(new Error("User not found"));

    await studentController.getStudentByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 for unexpected error", async () => {
    req = { params: { userRegistration: "123" } };
    studentService.getStudentByRegistration.mockRejectedValue(new Error("Database failure"));

    await studentController.getStudentByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  // updateStudent
  it("should update student successfully", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    const updatedstudent = { ...mockStudent, userEmail: "rafael.sobral@ufcg.email.com" };
    studentService.updateStudent.mockResolvedValue(updatedstudent);

    await studentController.updateStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedstudent);
  });

  it("should return 404 when user not found", async () => {
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("User not found"));

    await studentController.updateStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when update failed", async () => {
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("Database failure"));

    await studentController.updateStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "invalid.update@email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("Permission denied"));

    await studentController.updateStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "update@email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("Not authenticated"));

    await studentController.updateStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteStudent
  it("should delete student successfully", async () => {
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockResolvedValue(mockStudent);

    await studentController.deleteStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Student deleted successfully.",
      deletedStudent: mockStudent,
    });
  });

  it("should return 404 when deletion does not find user", async () => {
    req = { params: { userRegistration: "123" } };
    studentService.deleteStudent.mockRejectedValue(new Error("User not found"));

    await studentController.deleteStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when deletion failed", async () => {
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockRejectedValue(new Error("Database failure"));

    await studentController.deleteStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockRejectedValue(new Error("Permission denied"));

    await studentController.deleteStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockRejectedValue(new Error("Not authenticated"));

    await studentController.deleteStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // loginStudent
  it("should login student successfully", async () => {
    req = { params: { userRegistration: "12345", userPassword: "54321" } };
    const token = { token: "abc123" };
    studentService.authenticate.mockResolvedValue(req as any);

    await studentController.loginStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      params: { userRegistration: "12345", userPassword: "54321" }
    });
  });

  it("should return 401 when failed", async () => {
    req = { params: { userRegistration: "123", userPassword: "pass" } };
    studentService.authenticate.mockRejectedValue(new Error("Invalid credentials"));

    await studentController.loginStudent(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
  
});
