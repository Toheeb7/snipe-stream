import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieRow({ title, movies, onSeeMore }) {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <section className="movie-row">
      <div className="movie-row-header">
        <h2>{title}</h2>

        {onSeeMore && (
          <button className="see-more-button" onClick={onSeeMore}>
            See More →
          </button>
        )}
      </div>

      <div className="movie-row-container">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)}
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
    </section>
  );
}

export default MovieRow;
