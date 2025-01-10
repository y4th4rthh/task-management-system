const express = require('express');
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/tasks',  createTask); // Create task (authenticated)
router.get('/tasks',  getAllTasks); // Get all tasks (authenticated)
router.get('/tasks/:taskId',  getTaskById); // Get task by ID (authenticated)
router.put('/tasks/:taskId',  updateTask); // Update task (authenticated)
router.delete('/tasks/:taskId',  deleteTask); // Delete task (authenticated)

module.exports = router;
