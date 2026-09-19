import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMovieDetails, getMovieVideos } from "../services/tmdb";

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);

        const [movieData, videoData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
        ]);

        setMovie(movieData);
        setVideos(videoData);
      } catch (error) {
        console.error(error);
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return <div className="watch-status">Loading movie...</div>;
  }

  if (error) {
    return <div className="watch-status">{error}</div>;
  }

  if (!movie) {
    return null;
  }

  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true,
    ) ||
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ||
    videos.find((video) => video.site === "YouTube");

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <main className="watch-page">
      {/* HEADER */}
      <div className="watch-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <span className="watch-brand">
          STREAM <strong>SNIPE</strong>
        </span>
      </div>

      {/* PLAYER */}
      <section
        className="watch-player"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        <div className="watch-player-overlay"></div>

        {trailer ? (
          <iframe
            className="watch-iframe"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="no-trailer">
            <h2>No Trailer Available</h2>

            <p>There is currently no trailer available for this movie.</p>
          </div>
        )}
      </section>

      {/* MOVIE INFORMATION */}
      <section className="watch-details">
        <div className="watch-title-row">
          <div>
            <span className="watch-label">NOW PLAYING</span>

            <h1>{movie.title}</h1>
          </div>

          <div className="watch-rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </div>
        </div>

        <div className="watch-meta">
          <span>
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </span>

          <span>•</span>

          <span>
            {movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"}
          </span>
        </div>

        <p className="watch-description">
          {movie.overview || "No description available."}
        </p>

        <div className="watch-genres">
          {movie.genres?.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Watch;
