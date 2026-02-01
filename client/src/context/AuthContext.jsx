import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUserLoggedIn = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/me', {
                withCredentials: true
            });

            if (response.data.status === 'success') {
                setUser(response.data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const logout = async () => {
        try {
            await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, refreshAuth: checkUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
