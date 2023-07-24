import TaskRepository from "../../repositories/TaskRepositories.js";

export default class DeleteTask {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async delete(_id: String) {
        await this.taskRepository.deleteTask(_id);
    }
}