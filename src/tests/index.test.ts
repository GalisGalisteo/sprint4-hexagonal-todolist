import { createServer } from "../infrastructure/database/connection";
import mongoose from "mongoose";
import app from "../config/app";


describe('infrastructure/database/connection/index', () => {

  afterEach(async () => {
    jest.restoreAllMocks();

    await mongoose.disconnect();
  });

  test('connects to MongoDB and Server when creating server', async () => {
    const mongooseConnectSpy = jest.spyOn(mongoose, 'connect');
    const appListenSpy = jest.spyOn(app, 'listen');

    const server = await createServer();

    expect(mongooseConnectSpy).toHaveBeenCalled();
    expect(appListenSpy).toHaveBeenCalled();

    await server?.close()
  });
}); 