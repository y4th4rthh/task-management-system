
import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (

<nav>
<h1>Task Management System</h1>
<ul>
  <li><Link to="/home">Home</Link></li>
  <li><button class="log-button" onClick={ () => navigate('/')}>Logout</button></li>
</ul>
</nav>

    );      
}
export default Navbar;
