const baseURL = "http://localhost:8080/api";

export const register = async (username, password) => {
    try {
        const response = await fetch(`${baseURL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || "Registration failed" };
        }

        const userData = await response.json();
        console.log("Registered successfully!", userData);

        const loginResult = await login(username, password);
        if (!loginResult.success) {
            return { success: false, error: "Registered but failed to log in: " + loginResult.error };
        }

        return { success: true };

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
        return { success: true };

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
                return { success: false, error: "Session expired or unauthorized. Please login again." };
            }

            const errorText = await response.text();
            return { success: false, error: "Logout failed: " + errorText };
        }

        localStorage.removeItem("token");
        return { success: true };

    } catch (error) {
        console.error("Logout error:", error.message);
        localStorage.removeItem("token");
        return { success: false, error: error.message || "Logout failed due to network error" };
    }
};

export const addToFavourites = async (id, name, imageURL) => {
    try {
        const responseponse = await fetch(`${baseURL}/user/favorites`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, name, imageURL })
        });

        if (!responseponse.ok) {
            throw new Error("Failed to add to favourites");
        }

        console.log("Added to favourites");
    } catch (error) {
        console.error("Error:", error.message);
    }
};

export const removeFromFavourites = async (id) => {
    try {
        const response = await fetch(`${baseURL}/user/favorites/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!response.ok) {
            throw new Error("Failed to remove from favourites");
        }

        console.log("Removed from favourites");
    } catch (error) {
        console.error("Error:", error.message);
    }
};