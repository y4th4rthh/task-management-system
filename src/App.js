import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskDetails from './components/TaskDetails';
import TaskEntry from './components/TaskEntry';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const App = () => {
    return (
        <Router>
             <Routes>
                <Route path="/home"  element={<HomePage/>} />
                <Route path="/tasks/:taskId" element={<TaskDetails/>} />
                <Route path="/edit-task/:taskId" element={<TaskEntry/>} />
                <Route path="/edit-task" element={<TaskEntry/>} />
                <Route path="/" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
            </Routes>
        </Router>
    );
};

export default App;
