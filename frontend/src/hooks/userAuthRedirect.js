import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userAuthRedirect = ( redirectTo='/login') => {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Attempt to access a protected route
                await axios.get(`${baseURL}/isLoggedIn`, { withCredentials: true });
            } catch (err) {
                // Not logged in, redirect to login page
                navigate(redirectTo);
            }
        };
        checkAuth();
    }, [navigate, redirectTo]);
};

return userAuthRedirect;