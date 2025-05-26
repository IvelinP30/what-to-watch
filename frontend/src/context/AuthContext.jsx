import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        const createdAt = localStorage.getItem("createdAt");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    setUser(null);
                } else {
                    setIsLoggedIn(true);
                    if (name && createdAt) {
                        setUser({ name, createdAt });
                    } else if (name) {
                        setUser({ name });
                    }
                }
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.clear();
                setIsLoggedIn(false);
                setUser(null);
            }
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, authModalOpen, setAuthModalOpen, user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};