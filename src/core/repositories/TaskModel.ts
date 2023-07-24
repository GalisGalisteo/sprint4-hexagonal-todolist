import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

const TaskModel = mongoose.model('Tasks', TaskSchema);

export default TaskModel;
