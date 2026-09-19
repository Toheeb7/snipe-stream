import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchMovies } from "../services/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const results = await searchMovies(query);

      setMovies(results);
    } catch (error) {
      console.error(error);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="search-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>Search Movies</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p className="status-message">Searching...</p>}

      {error && <p className="status-message">{error}</p>}

      {!loading && movies.length > 0 && (
        <section className="search-results">
          <h2>Results for "{query}"</h2>

          <div className="search-grid">
            {movies.map((movie) => (
              <div
                className="movie-card"
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-poster">No Poster</div>
                )}

                <div className="movie-info">
                  <h3>{movie.title}</h3>

                  <p>
                    ⭐{" "}
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading && query && movies.length === 0 && (
        <p className="status-message">No movies found.</p>
      )}
    </main>
  );
}

export default Search;
