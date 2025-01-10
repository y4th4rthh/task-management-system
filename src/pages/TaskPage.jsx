import React from 'react';
import TaskLists from '../components/TaskLists';

const TaskPage = ({ tasks }) => {
    return (
        <div>
            <h1>Task Management</h1>
            <TaskLists tasks={tasks} />
        </div>
    );
};

export default TaskPage;
