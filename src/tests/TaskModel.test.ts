import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TaskModel from '../core/repositories/TaskModel';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const MONGO_URI = mongoServer.getUri();
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('core/repositories/TaskModel', () => {
  test('should create a new task', async () => {
    const title = 'Test Task';
    const task = await TaskModel.create({ title });

    expect(task.title).toBe(title);
    expect(task.completed).toBe(false);
  });

  test('should set the task as completed', async () => {
    const title = 'Tests Task';
    const task = await TaskModel.create({ title });

    task.completed = true;
    await task.save();

    const updatedTask = await TaskModel.findById(task._id);
    expect(updatedTask?.completed).toBe(true);
  });
});