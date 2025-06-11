import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRequireAuth = ( redirectTo='/login') => {

    const [user, setUser] = React.useState(null);

    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Attempt to access a protected route
                const res = await axios.get(`${baseURL}/isLoggedIn`, { withCredentials: true });
                setUser(res.data.user);
                // console.log('User is authenticated:', user, 'and response from/isLoggedIn is:', res.data.user);
            } catch (err) {
                // Not logged in, redirect to login page
                navigate(redirectTo);
            }
        };
        checkAuth();
    }, [navigate, redirectTo]);
    // console.log('At userAuthRedirect hook, user is:', user);
    return user;
};

export default useRequireAuth;