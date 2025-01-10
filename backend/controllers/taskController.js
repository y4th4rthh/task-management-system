const Task = require('../models/TaskModel');

// Create a new task
const createTask = async (req, res) => {
    const { title, description, status, assignedTo } = req.body;

    try {
        const lastTask = await Task.findOne().sort({ taskId: -1 });
        const taskId = lastTask ? lastTask.taskId + 1 : 1;
        
        const newTask = new Task({taskId, title, description, status, assignedTo });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a task by ID
const getTaskById = async (req, res) => {
    const { taskId } = req.params;
    console.log(taskId)
    try {
        const task = await Task.findOne({taskId : taskId});
        console.log(task);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, status, assignedTo } = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            {taskId : taskId},
            { title, description, status, assignedTo, updatedAt: Date.now() },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        req.io.emit('task-update', task);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findOneAndDelete({taskId : taskId});
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
