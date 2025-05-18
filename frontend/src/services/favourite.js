const baseURL = "http://localhost:8080/api";

export const getFavorites = async () => {
    const response = await fetch(`${baseURL}/user/favorite`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    if (!response.ok) throw new Error("Failed to fetch favorites");
    return response.json();
};

export const addToFavorites = async (id, name, imageURL) => {
    const response = await fetch(`${baseURL}/user/favorite`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, imageURL }),
    });
    if (!response.ok) throw new Error("Failed to add to favorites");
    return response.json();
};

export const removeFromFavorites = async (id) => {
    const response = await fetch(`${baseURL}/user/favorite/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    if (!response.ok) throw new Error("Failed to remove from favorites");
};

export const isInFavourites = async (itemId) => {
    const response = await fetch(`${baseURL}/user/favorite/exists/${itemId}`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    if (!response.ok) throw new Error("Failed to check favourite status");
    return response.json();
};