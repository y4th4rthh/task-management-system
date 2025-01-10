const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    assignedTo: { type: String, required: true },  
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
