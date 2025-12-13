import Constants from "expo-constants"

// expo doesnt load env files on bundling so creating an app.config.js, and customizing works
const TMDB_TOKEN = Constants.expoConfig?.extra?.movieToken;


// tmdb object config
export const TMDB_CONFIG = {
    BASE_URL:"https://api.themoviedb.org/3",
    API_KEY: TMDB_TOKEN,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`
    }

}


export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint =
    query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  // If TMDB sends an error, parse the JSON body FIRST
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `TMDB Error ${errorData.status_code}: ${errorData.status_message}`
    );
  }

  const data = await response.json();
  return data.results;
};
