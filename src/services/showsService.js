const baseURL = import.meta.env.VITE_BASE_URL;
const accessToken = import.meta.env.VITE_DB_ACCESS_TOKEN;

const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
}

const currentYear = new Date().toJSON().slice(0, 4);

export const getShows = async (pageNumber, showsSort, releaseDateGTE = '1901-01-01', releaseDateLTE = currentYear, voteAverageGTE = 1, voteAverageLTE = 10, genres) => {

  try {
    const response = await fetch(
      `${baseURL}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&first_air_date.gte=${releaseDateGTE}-01-01&first_air_date.lte=${releaseDateLTE}-12-31&sort_by=${showsSort}&vote_average.gte=${voteAverageGTE}&vote_average.lte=${voteAverageLTE}&vote_count.gte=300&with_genres=${genres}`,
      optionsGet
    )
    const data = await response.json();
    if(data.success === false){
      return data
    }else {
      return {
        shows: data.results,
        totalShows: data.total_results
      };
    }

  } catch (error) {
    return {success: false}
  }
}