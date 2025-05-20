import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, setAuthModalOpen } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            setAuthModalOpen(true);
            navigate("/");
        }
    }, [isLoggedIn, setAuthModalOpen, navigate, location.pathname]);

    return isLoggedIn ? children : null;
};

export default ProtectedRoute;
