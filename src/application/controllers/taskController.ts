import Task from "../../core/domain/entities/Task.js";
import TaskModel from "../../core/repositories/TaskModel.js";
import { Request, Response } from "express";
import AddTask from "../../core/domain/use-cases/AddTask.js";
import DeleteTask from "../../core/domain/use-cases/DeleteTask.js";
import TaskRepositoryImpl from "../../infrastructure/repositories/TaskRepositoryImpl.js";
import MarkTaskCompleted from "../../core/domain/use-cases/MarkTaskCompleted.js";

const taskRepository = new TaskRepositoryImpl();

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = new TaskModel();
        const params = req.body;

        task.title = params.title;

        const addTaskUseCase = new AddTask(taskRepository);
        const newTask = await addTaskUseCase.execute(params.title);

        res.status(200).send({
            success: true,
            data: newTask
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error: "Error creating a task"
        });

    }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.params._id;
        const deleteTaskUseCase = new DeleteTask(taskRepository);
        var taskDeleted = await deleteTaskUseCase.delete(taskId)
        res.status(200).send({
            success: true,
            message: "Task deleted successfully",
        });

    } catch (error) {
        if (taskDeleted === undefined) {
            res.status(404).send({
                success: false,
                error: "Task not found",
            });
        } else {
            res.status(500).send({
                success: false,
                error: "Error deleting the task",
            });
        }
    }
}

export const completeTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.params._id;

        const markTaskCompletedUseCase = new MarkTaskCompleted(taskRepository);
        var taskCompleted = await markTaskCompletedUseCase.complete(taskId);
        res.status(200).send({
            success: true,
            message: "Task completed successfully",
        });

    } catch (error) {
        if (taskCompleted === undefined) {
            res.status(404).send({
                success: false,
                error: "Task not found",
            });
        } else {
            res.status(500).send({
                success: false,
                error: "Error completing the task",
            });
        }
    }
}

export const findAll = async (req: Request, res: Response) => {
    try {
        const allTasks = await taskRepository.findAll();

        res.status(200).send({
            success: true,
            data: allTasks,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error: "Error showing all tasks"
        })
    }
}
export const findById = async (req: Request, res: Response) => {
    try {
        const taskId = req.params._id;
        var taskFinded = null;
        taskFinded = await taskRepository.findById(taskId);

        res.status(200).send({
            success: true,
            data: taskFinded,
        });

    } catch (error) {
        if (taskFinded === null) {
            res.status(404).send({
                success: false,
                error: "Task doesn't exist",
            });
        } else {
            res.status(500).send({
                success: false,
                error: "Error completing the task",
            });
        }
    }
}