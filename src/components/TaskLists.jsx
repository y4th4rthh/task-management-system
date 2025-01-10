import React from 'react';

const TaskList = ({ tasks }) => {
    return (
        <div>
            {tasks.map(task => (
                <div key={task.taskId}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <span>{task.status}</span>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
