import { Request, Response } from "express";
import { completeTask } from "../application/controllers/taskController";
import MarkTaskCompleted from "../core/domain/use-cases/MarkTaskCompleted";

jest.mock("../core/domain/use-cases/MarkTaskCompleted");

const mockRequest = {} as Request;
mockRequest.params = { _id: "task-id-1" };
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
} as unknown as Response;

describe("application/controllers/taskController-completeTask", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should complete a task successfully", async () => {
        const completeTaskUseCaseMock = jest.fn().mockResolvedValue(true);
        (MarkTaskCompleted as jest.Mock).mockImplementation(() => ({
            complete: completeTaskUseCaseMock,
        }));

        await completeTask(mockRequest, mockResponse);

        expect(completeTaskUseCaseMock).toHaveBeenCalledWith("task-id-1");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({
            success: true,
            message: "Task completed successfully",
        });
    });

    test("should return a 404 error when task is not found", async () => {
        const completeTaskUseCaseMock = jest.fn().mockResolvedValue(false);
        (MarkTaskCompleted as jest.Mock).mockImplementation(() => ({
            complete: completeTaskUseCaseMock({ _id: "1" }),
        }));

        await completeTask(mockRequest, mockResponse);

        expect(completeTaskUseCaseMock).toHaveBeenCalledWith({ _id: "1" });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({
            success: false,
            error: "Task not found",
        });
    });
});
