var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TaskModel from "../../core/repositories/TaskModel.js";
import AddTask from "../../core/domain/use-cases/AddTask.js";
import DeleteTask from "../../core/domain/use-cases/DeleteTask.js";
import TaskRepositoryImpl from "../../infrastructure/repositories/TaskRepositoryImpl.js";
import MarkTaskCompleted from "../../core/domain/use-cases/MarkTaskCompleted.js";
const taskRepository = new TaskRepositoryImpl();
export const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new TaskModel();
        const params = req.body;
        task.title = params.title;
        const addTaskUseCase = new AddTask(taskRepository);
        const newTask = yield addTaskUseCase.execute(params.title);
        res.status(200).send({
            success: true,
            data: newTask
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error: "Error creating a task"
        });
    }
});
export const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params._id;
        const deleteTaskUseCase = new DeleteTask(taskRepository);
        var taskDeleted = yield deleteTaskUseCase.delete(taskId);
        res.status(200).send({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        if (taskDeleted === undefined) {
            res.status(404).send({
                success: false,
                error: "Task not found",
            });
        }
        else {
            res.status(500).send({
                success: false,
                error: "Error deleting the task",
            });
        }
    }
});
export const completeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params._id;
        const markTaskCompletedUseCase = new MarkTaskCompleted(taskRepository);
        var taskCompleted = yield markTaskCompletedUseCase.complete(taskId);
        res.status(200).send({
            success: true,
            message: "Task completed successfully",
        });
    }
    catch (error) {
        if (taskCompleted === undefined) {
            res.status(404).send({
                success: false,
                error: "Task not found",
            });
        }
        else {
            res.status(500).send({
                success: false,
                error: "Error completing the task",
            });
        }
    }
});
export const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTasks = yield taskRepository.findAll();
        res.status(200).send({
            success: true,
            data: allTasks,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error: "Error showing all tasks"
        });
    }
});
export const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params._id;
        var taskFinded = null;
        taskFinded = yield taskRepository.findById(taskId);
        res.status(200).send({
            success: true,
            data: taskFinded,
        });
    }
    catch (error) {
        if (taskFinded === null) {
            res.status(404).send({
                success: false,
                error: "Task doesn't exist",
            });
        }
        else {
            res.status(500).send({
                success: false,
                error: "Error completing the task",
            });
        }
    }
});
