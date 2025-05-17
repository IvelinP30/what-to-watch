import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("name");
                    setIsLoggedIn(false);
                    setUser(null);
                } else {
                    setIsLoggedIn(true);
                    if (name) setUser({ name });
                }
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                setIsLoggedIn(false);
                setUser(null);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
