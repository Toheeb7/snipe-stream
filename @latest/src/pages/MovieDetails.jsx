import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMovieDetails, getMovieRecommendations } from "../services/tmdb";

import { addToMyList, removeFromMyList, isInMyList } from "../utils/myList";

import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inMyList, setInMyList] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        setError("");

        const [movieData, recommendationData] = await Promise.all([
          getMovieDetails(id),
          getMovieRecommendations(id),
        ]);

        setMovie(movieData);
        setRecommendations(recommendationData);
        setInMyList(isInMyList(movieData.id));
      } catch (error) {
        console.error(error);
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  const handleMyList = () => {
    if (!movie) return;

    if (inMyList) {
      removeFromMyList(movie.id);
      setInMyList(false);
    } else {
      addToMyList(movie);
      setInMyList(true);
    }
  };

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error) {
    return <p className="status-message">{error}</p>;
  }

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "";

  return (
    <main className="movie-details">
      <div
        className="details-backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="details-overlay"></div>
      </div>

      <div className="details-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="details-layout">
          <img className="details-poster" src={posterUrl} alt={movie.title} />

          <div className="details-info">
            <h1>{movie.title}</h1>

            <div className="details-meta">
              <span>★ {movie.vote_average?.toFixed(1)}</span>

              <span>
                {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              </span>

              <span>
                {movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"}
              </span>
            </div>

            <p className="details-overview">
              {movie.overview || "No description available."}
            </p>

            <div className="details-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <div className="details-actions">
              <button
                className="watch-button"
                onClick={() => navigate(`/watch/${movie.id}`)}
              >
                ▶ Watch Now
              </button>

              <button className="secondary-button" onClick={handleMyList}>
                {inMyList ? "✓ Remove from My List" : "+ Add to My List"}
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="recommendations-section">
            <div className="recommendations-header">
              <h2>You Might Also Like</h2>
            </div>

            <div className="recommendations-row">
              {recommendations.slice(0, 10).map((recommendedMovie) => (
                <div
                  className="recommendation-card"
                  key={recommendedMovie.id}
                  onClick={() => navigate(`/movie/${recommendedMovie.id}`)}
                >
                  {recommendedMovie.poster_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${recommendedMovie.poster_path}`}
                      alt={recommendedMovie.title}
                    />
                  ) : (
                    <div className="recommendation-no-poster">No Poster</div>
                  )}

                  <div className="recommendation-info">
                    <h3>{recommendedMovie.title}</h3>

                    <p>⭐ {recommendedMovie.vote_average?.toFixed(1)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default MovieDetails;
