import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    return (

        <nav>
            <h1>Task Management System</h1>
            <ul>
                
                
                {isAuthenticated ? (
                    <>
                    <li><Link to="/home">Home</Link></li>
                    <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        {location.pathname === "/" ? (
                            <li><Link to="/register" className="login-button">Register</Link></li>
                        ) : (
                            <li><Link to="/" className="login-button">Login</Link></li>
                        )}
                    </>
                )}
            </ul>
        </nav>

    );
}
export default Navbar;
