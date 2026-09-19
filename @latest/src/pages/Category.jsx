import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMoviesByCategory } from "../services/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Category() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getMoviesByCategory(category, page);

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(error);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [category, page]);

  const getTitle = () => {
    if (category === "popular") return "Popular Movies";
    if (category === "top-rated") return "Top Rated Movies";
    if (category === "upcoming") return "Upcoming Movies";

    return "Movies";
  };

  return (
    <main className="category-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="category-header">
        <h1>{getTitle()}</h1>

        <p>
          Page {page} of {totalPages}
        </p>
      </div>

      {loading && <div className="status-message">Loading movies...</div>}

      {error && <div className="status-message">{error}</div>}

      {!loading && !error && (
        <>
          <div className="category-grid">
            {movies.map((movie) => (
              <div
                className="category-card"
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />

                <div className="movie-info">
                  <h3>{movie.title}</h3>

                  <p>⭐ {movie.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ← Previous
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Category;
