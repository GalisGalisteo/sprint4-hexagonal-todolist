import TaskModel from "../../core/repositories/TaskModel.js";
import Task from "../../core/domain/entities/Task.js";
import TaskRepository from "../../core/repositories/TaskRepositories.js";

export default class TaskRepositoryImpl implements TaskRepository {
    async addTask(newTask: Task): Promise<void> {
        await TaskModel.create(newTask);
    }

    async findAll(): Promise<Task[]> {
        return TaskModel.find();
    }

    async findById(_id: String): Promise<Task | null> {
        return TaskModel.findOne(_id);
    }

    async updateTask(task: Task): Promise<void> {
        await TaskModel.updateOne(task);
    }

    async deleteTask(_id: String): Promise<void> {
        await TaskModel.findByIdAndDelete(_id);
    }
    
}