import { TeacherController } from "../src/controllers/teacherController";
import { ITeacherService } from "../src/services/interfaces/iTeacherService";
import { Request, Response } from "express";

describe("TeacherController (Unit Test)", () => {
  let teacherService: jest.Mocked<ITeacherService>;
  let teacherController: TeacherController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    teacherService = {
      createTeacher: jest.fn(),
      getAllTeachers: jest.fn(),
      getTeacherByRegistration: jest.fn(),
      updateTeacher: jest.fn(),
      deleteTeacher: jest.fn(),
      authenticate: jest.fn(),
    };

    teacherController = new TeacherController(teacherService);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  const mockTeacher = {
    userId: 1,
    userName: "Rafael Sobral",
    userEmail: "rafael.sobral@email.com",
    userRegistration: "12345",
    userPassword: "54321",
  } as any;

  // createTeacher
  it("should create a teacher successfully", async () => {
    // Arrange
    req = { body: mockTeacher };
    teacherService.createTeacher.mockResolvedValue(mockTeacher);

    // Act
    await teacherController.createTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockTeacher);
  });

  it("should return 401 when user is not authenticated to creation", async () => {
    // Arrange
    req = { body: mockTeacher };
    teacherService.createTeacher.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await teacherController.createTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  it("should return 400 when creating with invalid data", async () => {
    // Arrange
    req = { body: { ...mockTeacher, userEmail: "" } };
    teacherService.createTeacher.mockRejectedValue(new Error("Validation error"));

    // Act    
    await teacherController.createTeacher(req as Request, res as Response);

    // Assert    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  it("should return 500 for a generic creation error", async () => {
    // Arrange
    req = { body: mockTeacher };
    teacherService.createTeacher.mockRejectedValue(new Error("Database connection failed"));

    // Act    
    await teacherController.createTeacher(req as Request, res as Response);

    // Assert    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getAllTeachers
  it("should return all teachers successfully", async () => {
    // Arrange
    const teachers = [mockTeacher];
    teacherService.getAllTeachers.mockResolvedValue(teachers);

    // Act
    await teacherController.getAllTeachers({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(teachers);
  });

  it("should return 500 when query failed", async () => {
    // Arrange
    teacherService.getAllTeachers.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await teacherController.getAllTeachers({} as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // getTeacherByRegistration
  it("should return a teacher by registration", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    teacherService.getTeacherByRegistration.mockResolvedValue(mockTeacher);

    // Act
    await teacherController.getTeacherByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeacher);
  });

  it("should return 404 when query not found", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    teacherService.getTeacherByRegistration.mockRejectedValue(new Error("User not found"));

    // Act
    await teacherController.getTeacherByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 for unexpected error", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    teacherService.getTeacherByRegistration.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await teacherController.getTeacherByRegistration(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  // updateTeacher
  it("should update teacher successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    const updatedTeacher = { ...mockTeacher, userEmail: "rafael.sobral@ufcg.email.com" };
    teacherService.updateTeacher.mockResolvedValue(updatedTeacher);

    // Act
    await teacherController.updateTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTeacher);
  });

  it("should return 404 when user not found", async () => {
    // Arrange
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    teacherService.updateTeacher.mockRejectedValue(new Error("User not found"));

    // Act
    await teacherController.updateTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when update failed", async () => {
    // Arrange
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    teacherService.updateTeacher.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await teacherController.updateTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "invalid.update@email.com" } };
    teacherService.updateTeacher.mockRejectedValue(new Error("Permission denied"));

    // Act
    await teacherController.updateTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not authenticated to update", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" }, body: { userEmail: "update@email.com" } };
    teacherService.updateTeacher.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await teacherController.updateTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // deleteTeacher
  it("should delete teacher successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    teacherService.deleteTeacher.mockResolvedValue(mockTeacher);

    // Act
    await teacherController.deleteTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Teacher deleted successfully.",
      deletedTeacher: mockTeacher,
    });
  });

  it("should return 404 when deletion does not find user", async () => {
    // Arrange
    req = { params: { userRegistration: "123" } };
    teacherService.deleteTeacher.mockRejectedValue(new Error("User not found"));

    // Act
    await teacherController.deleteTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 500 when deletion failed", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    teacherService.deleteTeacher.mockRejectedValue(new Error("Database connection failed"));

    // Act
    await teacherController.deleteTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database connection failed" });
  });

  it("should return 403 when user is unauthorized to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    teacherService.deleteTeacher.mockRejectedValue(new Error("Permission denied"));

    // Act
    await teacherController.deleteTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
  });

  it("should return 401 when user is not autheticated to deletion", async () => {
    // Arrange
    req = { params: { userRegistration: "12345" } };
    teacherService.deleteTeacher.mockRejectedValue(new Error("Not authenticated"));

    // Act
    await teacherController.deleteTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
  });

  // loginTeacher
  it("should login teacher successfully", async () => {
    // Arrange
    req = { params: { userRegistration: "12345", userPassword: "54321" } };
    const token = { token: "abc123" };
    teacherService.authenticate.mockResolvedValue(token as any);

    // Act
    await teacherController.loginTeacher(req as Request, res as Response);

    // Assert
    expect(teacherService.authenticate).toHaveBeenCalledWith("12345", "54321");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "abc123" });
  });

  it("should return 401 when failed", async () => {
    // Arrange
    req = { params: { userRegistration: "123", userPassword: "pass" } };
    teacherService.authenticate.mockRejectedValue(new Error("Invalid credentials"));

    // Act
    await teacherController.loginTeacher(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

});
