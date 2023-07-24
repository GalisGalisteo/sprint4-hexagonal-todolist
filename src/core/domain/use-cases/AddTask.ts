import Task from "../entities/Task.js";
import TaskRepository from "../../repositories/TaskRepositories.js";

export default class AddTask {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(title: string) {
        const newTask = new Task(title);
        await this.taskRepository.addTask(newTask);
        return newTask;
    }
}