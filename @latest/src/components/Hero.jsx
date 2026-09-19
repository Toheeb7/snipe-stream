import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Hero({ movie }) {
  const navigate = useNavigate();

  if (!movie) {
    return null;
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : "";

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${backdropUrl})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-label">STREAM SNIPE ORIGINAL</p>

        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>

          <span>{movie.release_date?.slice(0, 4)}</span>
        </div>

        <p className="hero-description">{movie.overview}</p>

        <div className="hero-buttons">
          <button
            className="hero-watch"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            ▶ Watch Now
          </button>

          <button
            className="hero-details"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
