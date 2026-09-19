const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

console.log("TMDB key loaded:", !!API_KEY);

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log("TMDB ERROR:", errorData);

    throw new Error(errorData.status_message || "Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log("TMDB DETAILS ERROR:", errorData);

    throw new Error(
      errorData.status_message || "Failed to fetch movie details",
    );
  }

  const data = await response.json();
  return data;
}
export async function getTopRatedMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  const data = await response.json();
  return data.results;
}

export async function getUpcomingMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }

  const data = await response.json();
  return data.results;
}
export async function getMovieVideos(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos");
  }

  const data = await response.json();

  return data.results;
}
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();

  return data.results;
}
export async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genre movies");
  }

  const data = await response.json();

  return data.results || [];
}
export async function getMoviesByCategory(category, page = 1) {
  let endpoint = "";

  if (category === "popular") {
    endpoint = "/movie/popular";
  } else if (category === "top-rated") {
    endpoint = "/movie/top_rated";
  } else if (category === "upcoming") {
    endpoint = "/movie/upcoming";
  } else {
    throw new Error("Invalid movie category");
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data;
}
