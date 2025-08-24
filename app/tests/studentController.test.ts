import { StudentController } from "../src/controllers/studentController";
import { IStudentService } from "../src/services/interfaces/iStudentService";
import { Request, Response } from "express";

describe("StudentController (Unit Test)", () => {
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
    // Arrange
    req = { body: mockStudent };
    studentService.createStudent.mockResolvedValue(mockStudent);

    // Act
    await studentController.createStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    // Arrange
    req = { body: mockStudent };
    studentService.createStudent.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await studentController.createStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 400 when creating with invalid data", async () => {
    // Arrange
    req = { body: { ...mockStudent, userEmail: "" } };
    studentService.createStudent.mockRejectedValue(new Error("Validation error"));

    // Act    
    await studentController.createStudent(req as Request, res as Response);

    // Assert    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 for a generic creation error", async () => {
    // Arrange
    req = { body: mockStudent };
    studentService.createStudent.mockRejectedValue(new Error("Database connection failed"));

    // Act    
    await studentController.createStudent(req as Request, res as Response);

    // Assert    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getAllStudents
  it("should return all students successfully", async () => {
    // Arrange
    const students = [mockStudent];
    studentService.getAllStudents.mockResolvedValue(students);

    // Act
    await studentController.getAllStudents({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(students);
  });

  it("should return 500 when query failed", async () => {
    // Arrange
    studentService.getAllStudents.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await studentController.getAllStudents({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getStudentByRegistration
  it("should return a student by registration", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    studentService.getStudentByRegistration.mockResolvedValue(mockStudent);

    // Act
    await studentController.getStudentByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });

  it("should return 404 when query not found", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    studentService.getStudentByRegistration.mockRejectedValue(new Error("User not found"));

    // Act
    await studentController.getStudentByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 for unexpected error", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    studentService.getStudentByRegistration.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await studentController.getStudentByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // updateStudent
  it("should update student successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    const updatedstudent = { ...mockStudent, userEmail: "rafael.sobral@ufcg.email.com" };
    studentService.updateStudent.mockResolvedValue(updatedstudent);

    // Act
    await studentController.updateStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedstudent);
  });

  it("should return 404 when user not found", async () => {
    // Arrange
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("User not found"));

    // Act
    await studentController.updateStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when update failed", async () => {
    // Arrange
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await studentController.updateStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "invalid.update@email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("Permission denied"));

    // Act
    await studentController.updateStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "update@email.com" } };
    studentService.updateStudent.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await studentController.updateStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteStudent
  it("should delete student successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockResolvedValue(mockStudent);

    // Act
    await studentController.deleteStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Student deleted successfully.",
      deletedStudent: mockStudent,
    });
  });

  it("should return 404 when deletion does not find user", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    studentService.deleteStudent.mockRejectedValue(new Error("User not found"));

    // Act
    await studentController.deleteStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when deletion failed", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await studentController.deleteStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockRejectedValue(new Error("Permission denied"));

    // Act
    await studentController.deleteStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    studentService.deleteStudent.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await studentController.deleteStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // loginStudent
  it("should login student successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345", userPassword: "54321" } };
    const token = { token: "abc123" };
    studentService.authenticate.mockResolvedValue(token as any);

    // Act
    await studentController.loginStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "abc123" });
  });

  it("should return 401 when failed", async () => {
    // Arrange
    req = { params: { userRegistration: "123", userPassword: "pass" } };
    studentService.authenticate.mockRejectedValue(new Error("Invalid credentials"));

    // Act
    await studentController.loginStudent(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
  
});
