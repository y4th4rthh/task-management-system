import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
     const { taskId } = useParams();

    const handleLogout = () => {
        localStorage.removeItem('token');
        // navigate('/');
    };
    return (

        <nav>
            <h1>T.M.S.</h1>
            <ul>
                
                
                {location.pathname === "/home" || location.pathname === "/edit-task" || location.pathname === `/tasks/${taskId}` || location.pathname === `/edit-task/${taskId}` ? (
                    <>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>
                    </>
                ) : (
                    <>
                        {location.pathname === "/" ? (
                            <li><Link to="/register" className="login-nav-button">Register</Link></li>
                        ) : (
                            <li><Link to="/" className="login-nav-button">Login</Link></li>
                        )}
                    </>
                )}
            </ul>
        </nav>

    );
}
export default Navbar;
