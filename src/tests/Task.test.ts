import Task from "../core/domain/entities/Task";


describe('core/domain/entities/Task', () => {
  
    test('should create a task with the provided title and default completed status', () => {
    const title = 'Test Task';
    const task = new Task(title);

    expect(task.title).toBe(title);
    expect(task.completed).toBe(false);
  });

  test('should set the task as completed', () => {
    const title = 'Test Task';
    const task = new Task(title);

    task.completed = true;

    expect(task.completed).toBe(true);
  });

  test('should set and get the _id property', () => {
    const title = 'Test Task';
    const task = new Task(title);

    const taskId = 'task123';
    task._id = taskId;

    expect(task._id).toBe(taskId);
  });
});
