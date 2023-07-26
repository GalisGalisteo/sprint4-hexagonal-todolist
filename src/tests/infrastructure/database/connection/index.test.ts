import { createServer } from "../../../../infrastructure/database/connection";
import mongoose from "mongoose";
import app from "../../../../config/app";

afterEach(async () => {
  jest.restoreAllMocks();

  await mongoose.disconnect();
});

test('connects to MongoDB when creating server', async () => {
  const mongooseConnectSpy = jest.spyOn(mongoose, 'connect');

  const server = await createServer();

  expect(mongooseConnectSpy).toHaveBeenCalled();

  await server?.close()
});

 test('connects to Server when creating server', async () => {
  const appListenSpy = jest.spyOn(app, 'listen');

  const server = await createServer();

  expect(appListenSpy).toHaveBeenCalled();

  await server?.close()
}); 