import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('https://task-management-system-ex1w.onrender.com/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', res.data.token);
            setLoading(false);
            navigate('/home');
        } catch (error) {
            setError('Invalid email or password');
            setLoading(false);
        }
    };

    return (
      <div>
        <Navbar/>  
      <div className="login-page">  
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form className="login-form" onSubmit={handleSubmit}>
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
                
                <button 
                    className="login-button" 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            
            <p className="register-link">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
        </div>
        </div>
    );
};

export default LoginPage;
