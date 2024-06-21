import React from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const nav = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:7007/auth/logout'); // Make a GET request to /auth/logout
            console.log(response.data); // Log the response message

            // Call the parent component's logout handler if provided
           nav('/')
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
