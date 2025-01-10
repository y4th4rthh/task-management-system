import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/TaskDetails.css';
import Navbar from './Navbar';

const TaskDetails = () => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const { taskId } = useParams();
    const navigate = useNavigate();

    console.log(taskId);
    useEffect(() => {
        const fetchTask = async () => {
            try {

                const res = await axios.get(`https://task-management-system-ex1w.onrender.com/api/tasks/${taskId}`);
                setTask(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://task-management-system-ex1w.onrender.com/api/tasks/${taskId}`);
            alert('Task deleted successfully');
            navigate('/home');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (loading) {
        return <div className="loading-message">Loading task details...</div>;
    }

    if (!task) {
        return <div className="loading-message">Task not found!...</div>;
    }

    return (
        <div>
            <Navbar/>
        <div className="task-details-container">
            <h2 className="task-details-title">{task.title}</h2>
            <div className="task-details">
                <p className="task-value"><b>Description:</b> {task.description}</p>
                <p className="task-value"><b>Status:</b> {task.status}</p>
                <p className="task-value"><b>Assigned To:</b> {task.assignedTo}</p>
                <p className="task-value"><b>Created At:</b> {new Date(task.createdAt).toLocaleString()}</p>
                <p className="task-value"><b>Updated At:</b> {new Date(task.updatedAt).toLocaleString()}</p>
            
                <div className="button-group">
                    <button
                        className="delete-button"
                        onClick={() => handleDeleteTask(task.taskId)}
                    >
                        Delete Task
                    </button>
                    <button
                        className="cancel-button"
                        onClick={() => navigate('/home')}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default TaskDetails;
