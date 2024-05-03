import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const isAdmin = UserService.isAdmin();



    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            setIsAuthenticated(UserService.isAuthenticated());
        }
        // setIsAuthenticated(UserService.isAuthenticated());
    };


    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">WorkForce Pro</Link></li>}
                {isAuthenticated && <li><Link to="/profile">My Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">Employee Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;