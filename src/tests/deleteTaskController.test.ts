import { Request, Response } from "express";
import { deleteTask } from "../application/controllers/taskController";
import DeleteTask from "../core/domain/use-cases/DeleteTask";

jest.mock("../core/domain/use-cases/DeleteTask");

const mockRequest = {} as Request;
mockRequest.params = { _id: "task-id-1" };
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as Response;

describe("application/controllers/taskController-deleteTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should delete a task successfully", async () => {
    const deleteTaskUseCaseMock = jest.fn().mockResolvedValue(true);
    (DeleteTask as jest.Mock).mockImplementation(() => ({
      delete: deleteTaskUseCaseMock,
    }));

    await deleteTask(mockRequest, mockResponse);

    expect(deleteTaskUseCaseMock).toHaveBeenCalledWith("task-id-1");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: true,
      message: "Task deleted successfully",
    });
  });

  test("should return a 404 error when task is not found", async () => {
    const deleteTaskUseCaseMock = jest.fn().mockResolvedValue(false);
    (DeleteTask as jest.Mock).mockImplementation(() => ({
      delete: deleteTaskUseCaseMock({ _id: "1" }),
    }));

    await deleteTask(mockRequest, mockResponse);

    expect(deleteTaskUseCaseMock).toHaveBeenCalledWith({ _id: "1" });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: false,
      error: "Task not found",
    });
  });
});
