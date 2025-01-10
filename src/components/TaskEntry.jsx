import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TaskEntry.css';

const TaskEntry = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'Pending',
        assignedTo: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const { taskId } = useParams();

    useEffect(() => {
        if (taskId) {
            setIsEditing(true);
            const fetchTask = async () => {
                setLoading(true);
                try {
                    const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
                    setTask(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            };
            fetchTask();
        }
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/tasks/${taskId}`, task);
            } else {
                await axios.post('http://localhost:5000/api/tasks', task);
            }
            setLoading(false);
            navigate('/home');
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return <div className="loading-message">Loading task details...</div>;
    }

    return (
        <div className="task-entry-container">
            <h2 className="task-entry-title">
                {isEditing ? 'Tweek Task' : 'Create New Task'}
            </h2>

            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-textarea"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Assigned To</label>
                    <input
                        className="form-input"
                        type="email"
                        name="assignedTo"
                        value={task.assignedTo}
                        onChange={handleChange}
                        placeholder="Enter assignee email"
                        required
                    />
                </div>

                <div className="button-group">
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Task')}
                    </button>
                    <button
                        className="cancel-button"
                        onClick={() => navigate('/home')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskEntry;