import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  function handleClick() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />

        <div className="movie-overlay">
          <button>▶</button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>★ {movie.vote_average?.toFixed(1)}</span>

          <span>{movie.release_date?.slice(0, 4)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
