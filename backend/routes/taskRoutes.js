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

router.post('/tasks',  createTask); 
router.get('/tasks',  getAllTasks); 
router.get('/tasks/:taskId',  getTaskById); 
router.put('/tasks/:taskId',  updateTask); 
router.delete('/tasks/:taskId',  deleteTask); 

module.exports = router;
