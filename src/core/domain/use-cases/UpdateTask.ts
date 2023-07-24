import Task from "../entities/Task";
import TaskRepository from "../../repositories/TaskRepositories.js";

export default class UpdateTask {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async update(task: Task) {
        await this.taskRepository.updateTask(task);
    }
}