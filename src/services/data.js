const baseURL = import.meta.env.VITE_BASE_URL;
const accessToken = import.meta.env.VITE_DB_ACCESS_TOKEN;

const optionsGet = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
}

const currentYear = new Date().getFullYear();

export const getMovieOfTheDay = async () => {
    try {
        const response = await fetch(`${baseURL}/trending/movie/day?language=en-US`, optionsGet)
        const data = await response.json();
        if (data.success === false) {
            return data
        } else {
            return data.results[0];
        }
    } catch (error) {
        return { success: false }
    }
}

export const getRandomMovieHero = async () => {
    try {
        const response = await fetch(`${baseURL}/trending/movie/day?language=en-US`, optionsGet)
        const data = await response.json();
        if (data.success === false) {
            return data
        } else {
            return data.results[Math.floor(Math.random() * data.results.length)];
        }
    } catch (error) {
        return { success: false }
    }
}

export const getMovies = async (pageNumber, moviesSort, releaseDateGTE = '1901-01-01', releaseDateLTE = currentYear, voteAverageGTE = 1, voteAverageLTE = 10, genres) => {
    try {
        const response = await fetch(
            `${baseURL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&primary_release_date.gte=${releaseDateGTE}-01-01&primary_release_date.lte=${releaseDateLTE}-12-31&sort_by=${moviesSort}&vote_average.gte=${voteAverageGTE}&vote_average.lte=${voteAverageLTE}&vote_count.gte=300&with_genres=${genres}`,
            optionsGet
        )
        const data = await response.json();
        if (data.success === false) {
            return data
        } else {
            return {
                movies: data.results,
                totalMovies: data.total_results
            };
        }
    } catch (error) {
        return { success: false }
    }
}

export const getItem = async (id, type) => {
    try {
        const response = await fetch(
            `${baseURL}/${type}/${id}`,
            optionsGet
        )
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false }
    }
}

export const getItemProviders = async (id, type) => {
    try {
        const response = await fetch(
            `${baseURL}/${type}/${id}/watch/providers`,
            optionsGet
        )

        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false }
    }
}

export const getItemTrailer = async (id, type) => {
    try {
        const response = await fetch(
            `${baseURL}/${type}/${id}/videos`,
            optionsGet
        )
        const data = await response.json();
        if (data.success === false) {
            return data;
        } else {
            const result = data.results.filter(item => item.type === 'Trailer');
            return result;
        }
    } catch (error) {
        return { success: false }
    }
}

export const getSimilarItems = async (id, type) => {
    try {
        const response = await fetch(
            `${baseURL}/${type}/${id}/similar`,
            optionsGet
        )
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false }
    }
}

export const getRandomMovie = async () => {
    const page = Math.floor(Math.random() * 10) + 1;
    const movie = Math.floor(Math.random() * 20);
    try {
        const response = await fetch(
            `${baseURL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=6.5&vote_count.gte=1000`,
            optionsGet
        )
        const data = await response.json();
        if (data.success === false) {
            return data;
        } else {
            return data?.results[movie]?.id;
        }

    } catch (error) {
        return { success: false }
    }
}

export const getSearch = async (searchQuery, pageNumber) => {
    try {
        const response = await fetch(
            `${baseURL}/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=${pageNumber}`,
            optionsGet
        )
        const data = await response.json();

        return data;
    } catch (error) {
        return { success: false }
    }
}

export const getItemExternalIds = async (id, type) => {
    try {
        const response = await fetch(
            `${baseURL}/${type}/${id}/external_ids`,
            optionsGet
        )

        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false }
    }
}

export const getItemCredits = async (id, type) => {
    try {
        const response = await fetch(
            `${baseURL}/${type}/${id}/credits`,
            optionsGet
        )

        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false }
    }
}

const currentYearJson = new Date().toJSON().slice(0, 4);

export const getShows = async (pageNumber, showsSort, releaseDateGTE = '1901-01-01', releaseDateLTE = currentYearJson, voteAverageGTE = 1, voteAverageLTE = 10, genres) => {
    try {
        const response = await fetch(
            `${baseURL}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&first_air_date.gte=${releaseDateGTE}-01-01&first_air_date.lte=${releaseDateLTE}-12-31&sort_by=${showsSort}&vote_average.gte=${voteAverageGTE}&vote_average.lte=${voteAverageLTE}&vote_count.gte=300&with_genres=${genres}`,
            optionsGet
        )
        const data = await response.json();
        if (data.success === false) {
            return data
        } else {
            return {
                shows: data.results,
                totalShows: data.total_results
            };
        }

    } catch (error) {
        return { success: false }
    }
}

export const getTrendingItems = async (type, timeWindow) => {
    try {
        const response = await fetch(
            `${baseURL}/trending/${type}/${timeWindow}`,
            optionsGet
        )

        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false }
    }
}