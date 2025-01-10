import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const socket = io('https://task-management-system-ex1w.onrender.com');

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
                                <span>👁️</span> View Details
                            </Link>
                            <Link to={`/edit-task/${task.taskId}`} className="action-link edit-link">
                                <span>✏️</span> Edit
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
