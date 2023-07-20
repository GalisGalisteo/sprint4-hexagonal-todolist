import TaskModel from "../../core/repositories/TaskModel";
import Task from "../../core/domain/entities/Task";
import TaskRepository from "../../core/repositories/TaskRepositories";
import { Schema, Document } from "mongoose";

export default class TaskRepositoryImpl extends Document implements TaskRepository {
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
        await TaskModel.deleteOne(_id);
    }
    
}