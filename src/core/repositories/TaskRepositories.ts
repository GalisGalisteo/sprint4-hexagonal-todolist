import { ObjectId } from "mongoose";
import Task from "../domain/entities/Task";

export default interface TaskRepository {
    addTask(newTask: Task): Promise<void>;
    findAll(): Promise<Task[]>;
    findById(_id: String): Promise<Task | null>;
    updateTask(task: Task): Promise<void>;
    deleteTask(_id: String): Promise<void>;
}