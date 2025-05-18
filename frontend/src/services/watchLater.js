const baseURL = "http://localhost:8080/api";

export const getWatchLater = async () => {
    const response = await fetch(`${baseURL}/user/watch-later`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    if (!response.ok) throw new Error("Failed to fetch watch later");
    return response.json();
};

export const addToWatchLater = async (id, name, imageURL, type) => {
    const response = await fetch(`${baseURL}/user/watch-later`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, imageURL, type }),
    });
    if (!response.ok) throw new Error("Failed to add to watch later");
    return response.json();
};

export const removeFromWatchLater = async (id) => {
    const response = await fetch(`${baseURL}/user/watch-later/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    if (!response.ok) throw new Error("Failed to remove from watch later");
};

export const isInWatchLater = async (itemId) => {
    const response = await fetch(`${baseURL}/user/watch-later/exists/${itemId}`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    if (!response.ok) throw new Error("Failed to check watch later status");
    return response.json();
};