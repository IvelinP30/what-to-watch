const baseURL = "http://localhost:8080/api";

export const register = async (username, password, name) => {
    try {
        const response = await fetch(`${baseURL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, name })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || "Registration failed" };
        }

        const loginResult = await login(username, password);

        if (!loginResult.success) {
            return { success: false, error: "Registered but failed to log in: " + loginResult.error };
        }

        return { success: true, user: loginResult.user };

    } catch (error) {
        console.error("Registration error:", error.message);
        return { success: false, error: error.message || "Unknown error" };
    }
};

export const login = async (username, password) => {
    try {
        const response = await fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || "Login failed" };
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);

        return { success: true, user: { name: data.name } };

    } catch (error) {
        console.error("Login error:", error.message);
        return { success: false, error: error.message || "Unknown error" };
    }
};

export const logout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return { success: false, error: "You're not logged in." };
    }

    try {
        const response = await fetch(`${baseURL}/auth/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                return { success: false, error: "Session expired or unauthorized. Please login again." };
            }

            const errorText = await response.text();
            return { success: false, error: "Logout failed: " + errorText };
        }

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        return { success: true };

    } catch (error) {
        console.error("Logout error:", error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        return { success: false, error: error.message || "Logout failed due to network error" };
    }
};