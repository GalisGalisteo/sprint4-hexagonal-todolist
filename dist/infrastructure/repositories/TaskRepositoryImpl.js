var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TaskModel from "../../core/repositories/TaskModel.js";
export default class TaskRepositoryImpl {
    addTask(newTask) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.create(newTask);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return TaskModel.find();
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return TaskModel.findById(_id);
        });
    }
    updateTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.findByIdAndUpdate(task);
        });
    }
    completeTask(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.findByIdAndUpdate(_id, { completed: true });
        });
    }
    deleteTask(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.findByIdAndDelete(_id);
        });
    }
}
