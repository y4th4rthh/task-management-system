import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const socket = io('https://task-management-system-ex1w.onrender.com');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('https://task-management-system-ex1w.onrender.com/api/tasks');
                setTasks(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        socket.on('taskUpdated', (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.taskId === updatedTask.taskId ? updatedTask : task
                )
            );
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'status-completed';
            case 'in progress':
                return 'status-progress';
            case 'pending':
                return 'status-pending';
            default:
                return '';
        }
    };

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
        return <div className="loading">Loading tasks...</div>;
    }

    return (
         <div>
            <Navbar />
        <div className="container">
            <header className="header">
                <h1 className="page-title">Task List</h1>
                <Link to="/edit-task" className="create-button">
                    <span className="create-button-icon">+</span>
                    Create New Task
                </Link>
            </header>

            <div className="task-grid">
                {tasks.map((task) => (
                    <div key={task.taskId} className="task-card">
                        <div className="task-header">
                            <h3 className="task-title">{task.title}</h3>
                            <span className={`status-badge ${getStatusClass(task.status)}`}>
                                {task.status}
                            </span>
                        </div>

                        <p className="task-assigned">
                            Assigned to: <span className="assigned-name">{task.assignedTo}</span>
                        </p>

                        <div className="task-actions">
                            <Link to={`/tasks/${task.taskId}`} className="action-link view-link">
                                View Details
                            </Link>
                            <Link to={`/edit-task/${task.taskId}`} className="action-link edit-link">
                                Edit
                            </Link>
                            <Link to='/home'  onClick={() => handleDeleteTask(task.taskId)} className="action-link delete-link">
                                     Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
             </div>
    );
};

export default HomePage;
