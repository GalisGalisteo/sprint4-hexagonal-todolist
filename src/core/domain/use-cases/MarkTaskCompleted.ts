import TaskRepository from "../../repositories/TaskRepositories";

export default class MarkTaskCompleted {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async complete(_id: String) {
        await this.taskRepository.completeTask(_id);
    }
}