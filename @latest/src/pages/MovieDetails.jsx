import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMovieDetails } from "../services/tmdb";
import { addToMyList, removeFromMyList, isInMyList } from "../utils/myList";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";
function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inMyList, setInMyList] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovieDetails(id);

        setMovie(data);
        setInMyList(isInMyList(data.id));
      } catch (error) {
        setError(error.message);
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
    return (
      <div className="details-status">
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  return (
    <main className="movie-details">
      {/* BACKDROP */}
      <div
        className="details-backdrop"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      />

      <div className="details-overlay" />

      {/* CONTENT */}
      <div className="details-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="details-layout">
          {/* POSTER */}
          <div className="details-poster-wrapper">
            <img className="details-poster" src={posterUrl} alt={movie.title} />
          </div>

          {/* INFORMATION */}
          <div className="details-info">
            <span className="details-label">MOVIE</span>

            <h1>{movie.title}</h1>

            <div className="details-meta">
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>

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

            {/* GENRES */}
            <div className="details-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="details-actions">
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

              <button className="secondary-button" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
