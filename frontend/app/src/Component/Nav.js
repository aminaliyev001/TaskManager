import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Logo from '../Photos/seniors.jpg';

const Nav = () => {
    const [fullName, setFullName] = useState(''); 

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('JWT'); 
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.unique_name; 
                setFullName(userId)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); 

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <div className="navbar__logo-img">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="navbar__logo-name">
                    <p>Task Manager</p>
                </div>
            </div>
            <div className="navbar__user">
                <p>{fullName}</p>
            </div>
        </nav>
    );
};

export default Nav;
