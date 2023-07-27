import { Request, Response } from "express";
import { addTask } from "../application/controllers/taskController";
import AddTask from "../core/domain/use-cases/AddTask";

jest.mock("../core/domain/use-cases/AddTask");

const mockRequest = {} as Request;
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
} as unknown as Response;

describe("application/controllers/taskController-addTask", () => {
    test("should add a new task successfully", async () => {
        const executeMock = jest.fn().mockResolvedValue({ id: 1, title: "Test Task" });

        (AddTask as jest.Mock).mockImplementation(() => ({
            execute: executeMock,
        }));

        const mockTitle = "Test Task";
        mockRequest.body = { title: mockTitle };

        await addTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({
            success: true,
            data: { id: 1, title: "Test Task" },
        });
    });

    test("should return an error when title is missing", async () => {
        const executeMock = jest.fn().mockRejectedValue(new Error()); // Simulate a rejected Promise when title is missing

        (AddTask as jest.Mock).mockImplementation(() => ({
            execute: executeMock,
        }));

        const mockTitle = "";
        mockRequest.body = { title: mockTitle };

        await addTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({
            success: false,
            error: "Please enter a title.",
        });
    });

    test("should return an error when AddTask throws an error", async () => {
        const errorMessage = "Test Error";
        const executeMock = jest.fn().mockRejectedValue(new Error(errorMessage));

        (AddTask as jest.Mock).mockImplementation(() => ({
            execute: executeMock,
        }));

        const mockTitle = "Test Task";
        mockRequest.body = { title: mockTitle };

        await addTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith({
            success: false,
            error: "Error creating a task",
        });
    });
});