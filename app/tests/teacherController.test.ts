import { TeacherController } from "../src/controllers/teacherController";
import { ITeacherService } from "../src/services/interfaces/iTeacherService";
import { Request, Response } from "express";

describe("TeacherController", () => {
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
    userEmail: "rafae.sobral@email.com",
    userRegistration: "12345",
    userPassword: "54321",
  } as any;

  // createTeacher
  it("It should create a teacher successfully", async () => {
    req = { body: mockTeacher };
    teacherService.createTeacher.mockResolvedValue(mockTeacher);

    await teacherController.createTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockTeacher);
  });

  it("It should return 400 when creation failed", async () => {
    req = { body: mockTeacher };
    teacherService.createTeacher.mockRejectedValue(new Error("Invalid data"));

    await teacherController.createTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid data" });
  });

  // getAllTeachers
  it("It should return all teachers successfully", async () => {
    const teachers = [mockTeacher];
    teacherService.getAllTeachers.mockResolvedValue(teachers);

    await teacherController.getAllTeachers({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(teachers);
  });

  it("It should return 500 when query failed", async () => {
    teacherService.getAllTeachers.mockRejectedValue(new Error("Database error"));

    await teacherController.getAllTeachers({} as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
  });

  // getTeacherByRegistration
  it("It should return a teacher by registration", async () => {
    req = { params: { userRegistration: "123" } };
    teacherService.getTeacherByRegistration.mockResolvedValue(mockTeacher);

    await teacherController.getTeacherByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeacher);
  });

  it("It should return 404 when query not found", async () => {
    req = { params: { userRegistration: "123" } };
    teacherService.getTeacherByRegistration.mockRejectedValue(new Error("User not found"));

    await teacherController.getTeacherByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("It should return 500 for unexpected error", async () => {
    req = { params: { userRegistration: "123" } };
    teacherService.getTeacherByRegistration.mockRejectedValue(new Error("Database failure"));

    await teacherController.getTeacherByRegistration(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  // updateTeacher
  it("It should update teacher successfully", async () => {
    req = { params: { userRegistration: "12345" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    const updatedTeacher = { ...mockTeacher, userEmail: "rafael.sobral@ufcg.email.com" };
    teacherService.updateTeacher.mockResolvedValue(updatedTeacher);

    await teacherController.updateTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTeacher);
  });

  it("It should return 404 when user not found", async () => {
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    teacherService.updateTeacher.mockRejectedValue(new Error("User not found"));

    await teacherController.updateTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("It should return 500 when update failed", async () => {
    req = { params: { userRegistration: "123" }, body: { userEmail: "rafael.sobral@ufcg.email.com" } };
    teacherService.updateTeacher.mockRejectedValue(new Error("Database failure"));

    await teacherController.updateTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  // deleteTeacher
  it("It should delete teacher successfully", async () => {
    req = { params: { userRegistration: "12345" } };
    teacherService.deleteTeacher.mockResolvedValue(mockTeacher);

    await teacherController.deleteTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Teacher deleted successfully.",
      deletedTeacher: mockTeacher,
    });
  });

  it("It should return 404 when deletion does not find user", async () => {
    req = { params: { userRegistration: "123" } };
    teacherService.deleteTeacher.mockRejectedValue(new Error("User not found"));

    await teacherController.deleteTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("It should return 500 when deletion failed", async () => {
    req = { params: { userRegistration: "12345" } };
    teacherService.deleteTeacher.mockRejectedValue(new Error("Database failure"));

    await teacherController.deleteTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database failure" });
  });

  // loginTeacher
  it("It should login teacher successfully", async () => {
    req = { params: { userRegistration: "12345", userPassword: "54321" } };
    const token = { token: "abc123" };
    teacherService.authenticate.mockResolvedValue(req as any);

    await teacherController.loginTeacher(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      params: { userRegistration: "12345", userPassword: "54321" }
    });
  });

  it("It should return 401 when failed", async () => {
    req = { params: { userRegistration: "123", userPassword: "pass" } };
    teacherService.authenticate.mockRejectedValue(new Error("Invalid credentials"));

    await teacherController.loginTeacher(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
});
