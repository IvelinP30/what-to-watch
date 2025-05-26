const baseURL = "http://localhost:8080/api";

export const getRecommendations = async () => {
    const response = await fetch(`${baseURL}/recommendations`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
    }

    return response.json();
};