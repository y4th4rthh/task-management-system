import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://task-management-system.onrender.com/api/auth/register', {
                email,
                password,
            });
            setLoading(false);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            setError('Error registering user');
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className='register-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                    className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                         placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                    className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                         placeholder="Enter your password"
                    />
                </div>
                <button className="register-button" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="login-link">
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
};

export default RegisterPage;
